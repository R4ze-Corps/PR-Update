"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
exports.registerCommands = registerCommands;
exports.handleInteractionCreate = handleInteractionCreate;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
class Command {
    config;
    constructor(config) {
        this.config = config;
    }
    get name() { return this.config.name; }
    get description() { return this.config.description; }
    get type() { return this.config.type; }
    get run() { return this.config.run; }
}
exports.Command = Command;
const commandsMap = new discord_js_1.Collection();
const slashCommands = [];
const commandsDir = (0, path_1.join)(__dirname, "../commands/public");
if ((0, fs_1.existsSync)(commandsDir)) {
    for (const file of (0, fs_1.readdirSync)(commandsDir).filter(f => !f.endsWith('.d.ts') && /\.(ts|js)$/.test(f))) {
        try {
            const cmd = require((0, path_1.join)(commandsDir, file)).default;
            if (cmd instanceof Command) {
                commandsMap.set(cmd.name, cmd);
                const cmdData = {
                    name: cmd.name,
                    description: cmd.description,
                    type: cmd.type,
                };
                const perms = cmd.config.defaultMemberPermissions ?? cmd.config.data?.default_member_permissions;
                if (perms)
                    cmdData.default_member_permissions = String(perms);
                const opts = cmd.config.data?.options;
                if (opts)
                    cmdData.options = opts;
                slashCommands.push(cmdData);
            }
        }
        catch (err) {
            console.error(`Erro ao carregar comando ${file}:`, err);
        }
    }
}
const responders = [];
const respondersDir = (0, path_1.join)(__dirname, "../responders");
if ((0, fs_1.existsSync)(respondersDir)) {
    for (const file of (0, fs_1.readdirSync)(respondersDir).filter(f => !f.endsWith('.d.ts') && /\.(ts|js)$/.test(f))) {
        try {
            const resp = require((0, path_1.join)(respondersDir, file)).default;
            if (resp?.customId)
                responders.push(resp);
        }
        catch (err) {
            console.error(`Erro ao carregar responder ${file}:`, err);
        }
    }
}
async function registerCommands(clientId, guildId, token) {
    const { REST, Routes } = await Promise.resolve().then(() => __importStar(require("discord.js")));
    const rest = new REST({ version: "10" }).setToken(token);
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands });
    console.log(`${slashCommands.length} comando(s) registrado(s).`);
}
function handleInteractionCreate(client) {
    client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
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
        }
        catch (error) {
            console.error("Erro no interaction handler:", error);
            if (!interaction.replied) {
                await interaction.reply({ content: "Erro interno.", ephemeral: true }).catch(() => { });
            }
        }
    });
}
//# sourceMappingURL=index.js.map