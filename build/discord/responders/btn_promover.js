"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _functions_1 = require("#functions");
function localCreateResponder(cfg) { return cfg; }
exports.default = localCreateResponder({
    customId: "upar/promover",
    types: ["Button"],
    cache: "cached",
    async run(interaction) {
        try {
            _functions_1.sessoesUpar.set(interaction.user.id, { tipo: "PROMOÇÃO" });
            const options = _functions_1.cargosPromocao.map(c => new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(c.nome)
                .setValue(c.id)
                .setEmoji("📈"));
            const select = new discord_js_1.StringSelectMenuBuilder()
                .setCustomId("upar/select_role")
                .setPlaceholder("Selecione o novo cargo para o membro...")
                .addOptions(options);
            await interaction.reply({
                components: [new discord_js_1.ActionRowBuilder().addComponents(select)],
                flags: discord_js_1.MessageFlags.Ephemeral,
            });
        }
        catch (err) {
            console.error("[btn_promover] erro:", err);
            if (!interaction.replied) {
                await interaction.reply({ content: "Erro.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
        }
    },
});
//# sourceMappingURL=btn_promover.js.map