import { EmbedBuilder } from "@discordjs/builders";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { sep } from "path";
import DiscordClient from "../../Examples/DiscordClient";
import { Product } from "../../Types";
const shopsDir = "Shops";
if (!existsSync(shopsDir)) {
    mkdirSync(shopsDir);
  }
class Shop{ 
    guildId:string;
    products:Product[];

    constructor(guildId:string, products:Product[] = []){
        this.guildId = guildId;
        this.products = products;
    }

   async getShopEmbed(){
    const guild = await DiscordClient.guilds.fetch(this.guildId);
        const embed = new EmbedBuilder()
        .setDescription(guild.name + "'s shop")
        .setThumbnail( await guild.icon_url)
        .setTimestamp()

        return embed
    }



    addProduct(product: Product){
        if(this.exists(product)) throw new Error("Product already exists");
        this.products.push(product);
        this.save();
        return product;
    }
    removeProduct(product: Product){
        if(!this.exists(product)) throw new Error("Product does not exist");
        const p = this.products.find(p => p.id === product.id);
        delete this.products[this.products.indexOf(p)];
    }

    exists(product: Product){
        const id = product.id;
        const p = this.products.find(p => p.id === id);
        if(p) return true;
        return false;
    }

    toJson(){
        return JSON.stringify(
            {
                guildId: this.guildId,
                products: this.products,
            }, null, 4);
    }
    save() {
        writeFile(
          `${shopsDir}${sep}${this.guildId}.json`,
           this.toJson(),
          "utf-8"
        );
      }
}
export default Shop;