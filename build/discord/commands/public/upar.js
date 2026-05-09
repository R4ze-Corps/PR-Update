"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _base_1 = require("#base");
const discord_1 = require("@magicyan/discord");
exports.default = new _base_1.Command({
    name: "upar",
    description: "Promover ou rebaixar um membro.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async run(interaction) {
        try {
            const row = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("upar/promover")
                .setLabel("Promover")
                .setEmoji("📈")
                .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
                .setCustomId("upar/rebaixar")
                .setLabel("Rebaixar")
                .setEmoji("📉")
                .setStyle(discord_js_1.ButtonStyle.Danger));
            const container = (0, discord_1.createContainer)("#2b2d31", "**GESTÃO DE MEMBROS**\nSelecione uma das opções abaixo para gerenciar a hierarquia de um membro.", row);
            await interaction.reply({
                components: [container],
                flags: discord_js_1.MessageFlags.IsComponentsV2,
            });
        }
        catch (err) {
            console.error("[Upar] erro:", err);
            if (!interaction.replied) {
                await interaction.reply({ content: "Erro.", ephemeral: true });
            }
        }
    },
});
//# sourceMappingURL=upar.js.map