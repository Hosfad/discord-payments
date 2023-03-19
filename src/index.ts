const express = require("express");
import DiscordClient from "./DiscordClient";
import CartManager from "./ShopSettings/CartManager";
require("dotenv").config();
const app = express();
app.use(express.json());
app.set("json spaces", 2);


if (!process.env.DISCORD_BOT_TOKEN) {
  throw new Error("Please define the Discord bot token in the .env file");
}
if (!process.env.DISCORD_BOT_APPLICATION_ID) {
  throw new Error("Please define the Discord application id in the .env file");
}
DiscordClient.login(process.env.DISCORD_BOT_TOKEN);
const cartManager = new CartManager(DiscordClient);
DiscordClient.cartManager = cartManager;
cartManager.getUserCart("521609038920941578", "1086729461057204224").then((cart) => {
 cart.addProduct({id: 1, name: "test", price: 1});
});
cartManager.on("cart_product_added", (data) => {  
  console.log("We listening")
    console.log(data);
});    

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
export {};
