

const { Client, GatewayIntentBits } = require('discord.js');

const DiscordClient = new Client({ intents: [GatewayIntentBits.Guilds ,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent

] });


 export default DiscordClient