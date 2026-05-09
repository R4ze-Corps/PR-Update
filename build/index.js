"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const _base_1 = require("#base");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
client.once("ready", async (c) => {
    console.log(`Bot conectado como ${c.user.tag}`);
    try {
        const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;
        if (CLIENT_ID && GUILD_ID && DISCORD_TOKEN) {
            await (0, _base_1.registerCommands)(CLIENT_ID, GUILD_ID, DISCORD_TOKEN);
        }
    }
    catch (err) {
        console.error("Erro ao registrar comandos:", err);
    }
});
(0, _base_1.handleInteractionCreate)(client);
client.login(process.env.DISCORD_TOKEN).catch(console.error);
//# sourceMappingURL=index.js.map