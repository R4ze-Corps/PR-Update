import { Collection, Events } from "discord.js";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export interface CommandConfig {
  name: string;
  description: string;
  type: number;
  defaultMemberPermissions?: bigint | string;
  data?: { options?: any[]; default_member_permissions?: string };
  run: (interaction: any) => Promise<void>;
}

export class Command {
  constructor(public config: CommandConfig) {}
  get name(): string { return this.config.name; }
  get description(): string { return this.config.description; }
  get type(): number { return this.config.type; }
  get run(): (interaction: any) => Promise<void> { return this.config.run; }
}

interface ResponderConfig {
  customId: string;
  types: string[];
  cache: string;
  run: (interaction: any) => Promise<void>;
}

const commandsMap = new Collection<string, Command>();
const slashCommands: any[] = [];

const commandsDir = join(__dirname, "../commands/public");
if (existsSync(commandsDir)) {
  for (const file of readdirSync(commandsDir).filter(f => !f.endsWith('.d.ts') && /\.(ts|js)$/.test(f))) {
    try {
      const cmd: Command = require(join(commandsDir, file)).default;
      if (cmd instanceof Command) {
        commandsMap.set(cmd.name, cmd);
        const cmdData: any = {
          name: cmd.name,
          description: cmd.description,
          type: cmd.type,
        };
        const perms = cmd.config.defaultMemberPermissions ?? cmd.config.data?.default_member_permissions;
        if (perms) cmdData.default_member_permissions = String(perms);
        const opts = cmd.config.data?.options;
        if (opts) cmdData.options = opts;
        slashCommands.push(cmdData);
      }
    } catch (err) {
      console.error(`Erro ao carregar comando ${file}:`, err);
    }
  }
}

const responders: ResponderConfig[] = [];
const respondersDir = join(__dirname, "../responders");
if (existsSync(respondersDir)) {
  for (const file of readdirSync(respondersDir).filter(f => !f.endsWith('.d.ts') && /\.(ts|js)$/.test(f))) {
    try {
      const resp: ResponderConfig = require(join(respondersDir, file)).default;
      if (resp?.customId) responders.push(resp);
    } catch (err) {
      console.error(`Erro ao carregar responder ${file}:`, err);
    }
  }
}

export async function registerCommands(clientId: string, guildId: string, token: string) {
  const { REST, Routes } = await import("discord.js");
  const rest = new REST({ version: "10" }).setToken(token);
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands });
  console.log(`${slashCommands.length} comando(s) registrado(s).`);
}

export function handleInteractionCreate(client: any) {
  client.on(Events.InteractionCreate, async (interaction: any) => {
    try {
      if (interaction.isChatInputCommand()) {
        const command = commandsMap.get(interaction.commandName);
        if (!command) {
          return interaction.reply({ content: "Comando não encontrado.", ephemeral: true });
        }
        return await command.run(interaction);
      }

      const responder = responders.find(r => interaction.customId === r.customId);
      if (responder) {
        return await responder.run(interaction);
      }
    } catch (error) {
      console.error("Erro no interaction handler:", error);
      if (!interaction.replied) {
        await interaction.reply({ content: "Erro interno.", ephemeral: true }).catch(() => {});
      }
    }
  });
}
