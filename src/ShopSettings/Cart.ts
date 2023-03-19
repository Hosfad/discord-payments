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

   async getUser(){
        return await this.client.users.fetch(this.userId);
    }
    async getGuild(){
        return await this.client.guilds.fetch(this.guildId);
    }

  
    save() {
        writeFile(
          `${cartsDir}${sep}${this.guildId}-${this.userId}.json`,
          this.toJson(),
          "utf-8"
        );
      }

      toJson(){
        return JSON.stringify ({
            userId: this.userId,
            guildId: this.guildId,
            items: this.items,
        }, null, 4)
    }

    /*
    async getProducts(){
        return await Carts.fetch(this.userId, this.guildId);
    }

   async addProduct(product: Product) {
        const cart = await Carts.fetch(this.userId, this.guildId);
        cart.items.push(product);
        Carts.saveCart(cart);
        const user = await this.client.users.fetch(this.userId);
        const guild = await this.client.guilds.fetch(this.guildId);
        const data = {
            user: user,
            guild: guild,
            product: product,
            cart: cart,
        };

        this.emit("cart_product_added", data);
    }*/
}
export default Cart;