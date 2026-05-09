"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _functions_1 = require("#functions");
function localCreateResponder(cfg) { return cfg; }
exports.default = localCreateResponder({
    customId: "upar/select_role",
    types: ["StringSelectMenu"],
    cache: "cached",
    async run(interaction) {
        try {
            const roleId = interaction.values[0];
            const sessao = _functions_1.sessoesUpar.get(interaction.user.id);
            if (!sessao) {
                return interaction.reply({ content: "Sessão expirada.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
            sessao.roleId = roleId;
            await interaction.guild.members.fetch();
            const members = interaction.guild.members.cache.filter((m) => m.roles.cache.has(_functions_1.FILTER_ROLE_ID));
            if (members.size === 0) {
                return interaction.update({
                    content: "Nenhum membro disponível com o cargo necessário.",
                    components: [],
                });
            }
            const options = members.map((m) => new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(m.user.username)
                .setValue(m.id)
                .setDescription(m.user.displayName)).slice(0, 25);
            const select = new discord_js_1.StringSelectMenuBuilder()
                .setCustomId("upar/select_member")
                .setPlaceholder("Selecione o membro...")
                .addOptions(options);
            await interaction.update({
                content: "Agora selecione o membro que receberá o cargo:",
                components: [new discord_js_1.ActionRowBuilder().addComponents(select)],
            });
        }
        catch (err) {
            console.error("[select_role_upar] erro:", err);
            if (!interaction.replied) {
                await interaction.reply({ content: "Erro.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
        }
    },
});
//# sourceMappingURL=select_user_upar.js.map