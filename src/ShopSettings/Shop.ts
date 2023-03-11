import { Guild } from "discord.js";

export default class Shop {
    guildId: string;
    constructor(guildId :string | Guild){
        this.guildId = typeof guildId === 'string' ? guildId : guildId.id;
        console.log(this.guildId);
    }    

}