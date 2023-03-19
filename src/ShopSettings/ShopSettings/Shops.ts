import { Guild } from "discord.js";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { sep } from "path";
import path = require("path");
import Shop from "./Shop";
const fs = require("fs");
const shopsDir = "Shops";
if (!existsSync(shopsDir)) {
    mkdirSync(shopsDir);
  }

async function getShopSettings(guildId: string  | Guild) : Promise<Shop> {
    const id = guildId instanceof Guild ? guildId.id : guildId;
    const jsonsInDir = fs.readdirSync(shopsDir);
    const f = jsonsInDir.find((file) => file === `${id}.json`);
    if(f) {
        const fileData = fs.readFileSync(path.join(shopsDir, f));
        const json = JSON.parse(fileData.toString());
        const shop = new Shop(json.guildId, json.products);
        return shop;
    } else {
      const shop = new Shop(id);
      shop.save();
        return shop;
    }
}
export default{
    getShopSettings
}



  