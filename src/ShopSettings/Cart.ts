import { Client } from "discord.js";
import { writeFile } from "fs/promises";
import { sep } from "path";
import { Product } from "../Types";

const cartsDir = "Carts";

class Cart {
    userId: string;
    guildId: string;
    client: Client;
    items: Product[];
    manager;
    constructor(userId: string, guildId: string,client:Client, manager) {
        this.userId = userId;
        this.guildId = guildId;
        this.client = client;
        this.manager = manager;
        if(this.items === undefined) this.items = [];
    }

    /**
     * Add a product to the cart.       
     * @param product Product you want to add to the cart.
     */
   async addProduct(product: Product) {
        this.items.push(product);
        this.save();
        const data = {
            user: await this.getUser(),
            guild: await this.getGuild(),
            product: product,
            cart: this,

        }
        this.manager.emit("cart_product_added", data);
    }
    /**
     * Fech the discord user object.
     * @returns User object.
     */
   async getUser(){
        return await this.client.users.fetch(this.userId);
    }
        /**
     * Fech the discord guild object.
     * @returns Guild object.
     */
    async getGuild(){
        return await this.client.guilds.fetch(this.guildId);
    }

    /**
     * Save cart to local storage
     */
    save() {
        writeFile(
          `${cartsDir}${sep}${this.guildId}-${this.userId}.json`,
          this.toJson(),
          "utf-8"
        );
      }
    /**
     * Searialize cart object to json so it can be saved to local storage.
     * @returns Json string.
     */
      toJson(){
        return JSON.stringify ({
            userId: this.userId,
            guildId: this.guildId,
            items: this.items,
        }, null, 4)
    }

}
export default Cart;