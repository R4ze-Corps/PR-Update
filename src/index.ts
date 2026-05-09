import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { handleInteractionCreate, registerCommands } from "#base";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", async (c) => {
  console.log(`Bot conectado como ${c.user.tag}`);
  try {
    const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;
    if (CLIENT_ID && GUILD_ID && DISCORD_TOKEN) {
      await registerCommands(CLIENT_ID, GUILD_ID, DISCORD_TOKEN);
    }
  } catch (err) {
    console.error("Erro ao registrar comandos:", err);
  }
});

handleInteractionCreate(client);
client.login(process.env.DISCORD_TOKEN).catch(console.error);
