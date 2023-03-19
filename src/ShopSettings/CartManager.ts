import { Client, Guild, IntentsBitField, User } from "discord.js";
import EventEmitter = require("events");
import { existsSync, mkdirSync } from "fs";
const fs = require("fs");
import Cart from "./Cart";
import path = require("path");
const cartsDir = "Carts";

class CartManager extends EventEmitter {
  client: Client;
  constructor(client: Client) {
    super();
    this.client = client;
    if (!existsSync(cartsDir)) {
      mkdirSync(cartsDir);
    }
  }

  /**
   * Get all the saved carts.
   * @param userId The user you want to fetch the cart for.
   * @param guildId The target server.
   * @returns Cart for the user.
   */

  async getUserCart(
    userId: string | User,
    guildId: string | Guild
  ): Promise<Cart> {
    const user_id = userId instanceof User ? userId.id : userId;
    const guild_id = guildId instanceof Guild ? guildId.id : guildId;
    const carts = await this.getAllCarts(guild_id);
    return new Promise(async (resolve, reject) => {
      const cart = carts.find(
        (cart) => cart.userId === user_id && cart.guildId === guild_id
      );
      if (cart) {
        resolve(cart);
      } else {
        const newCart = new Cart(user_id, guild_id, this.client,this);
        newCart.save();
        resolve(newCart);
      }
    });
  }

  /**
   * Get all the saved carts.
   * @param guildId Server id you want to get the carts for.
   * @returns Array of carts.
   */
  async getAllCarts(guildId?: string | Guild): Promise<Cart[]> {
    const id = guildId instanceof Guild ? guildId.id : guildId;
    const carts: Cart[] = [];
    const jsonsInDir = fs.readdirSync(cartsDir);

    jsonsInDir.forEach((file) => {
      const fileData = fs.readFileSync(path.join(cartsDir, file));
      const json = JSON.parse(fileData.toString());
      const cart = new Cart(json.userId, json.guildId, this.client,this);
      cart.items = json.items;
      if (id) {
        if (cart.guildId === id) {
          carts.push(cart);
        }
      } else {
        carts.push(cart);
      }
    });
    return carts;
  }
}


export default CartManager;
