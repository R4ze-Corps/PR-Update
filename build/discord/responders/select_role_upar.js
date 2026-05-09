"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_1 = require("@magicyan/discord");
const _functions_1 = require("#functions");
function localCreateResponder(cfg) { return cfg; }
exports.default = localCreateResponder({
    customId: "upar/select_member",
    types: ["StringSelectMenu"],
    cache: "cached",
    async run(interaction) {
        try {
            const memberId = interaction.values[0];
            const sessao = _functions_1.sessoesUpar.get(interaction.user.id);
            if (!sessao || !sessao.roleId) {
                return interaction.reply({ content: "Sessão expirada.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
            const targetMember = await interaction.guild.members.fetch(memberId).catch(() => null);
            if (!targetMember) {
                return interaction.reply({ content: "Membro não encontrado.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
            const newRoleId = sessao.roleId;
            const isPromocao = sessao.tipo === "PROMOÇÃO";
            const isGerencia = _functions_1.gerenciaRoleIds.has(newRoleId);
            const allIds = (0, _functions_1.getAllRoleIds)();
            await targetMember.roles.remove(allIds).catch(console.error);
            await targetMember.roles.add(newRoleId).catch(console.error);
            if (isPromocao && isGerencia) {
                await targetMember.roles.add(_functions_1.GERAIS_ROLE_ID).catch(console.error);
            }
            if (!isPromocao && !isGerencia) {
                await targetMember.roles.remove(_functions_1.GERAIS_ROLE_ID).catch(console.error);
            }
            const texto = isPromocao
                ? `**HUHU! TEMOS NOVIDADES! 🥳**\n\nParabéns, <@${memberId}>! Seu esforço e dedicação brilharam tanto que você acaba de subir de nível! ✨\n\n**🎖️ Novo Cargo:** <@&${newRoleId}>\n\nEstamos muito felizes em ver seu crescimento por aqui. Continue com esse brilho e vamos juntos! 🚀💖`
                : `**Opa, passando para dar um aviso! ✨**\n\nOlá, <@${memberId}>, informamos que seu cargo foi atualizado para <@&${newRoleId}>.\n\nNão desanime! As portas continuam abertas e estamos aqui para te apoiar a subir de novo em breve. Qualquer dúvida, é só chamar a gente! ✨🌸`;
            const container = (0, discord_1.createContainer)(isPromocao ? "#57F287" : "#ED4245", texto);
            const canal = interaction.guild.channels.cache.get(_functions_1.CANAL_DESTINO_ID);
            if (canal) {
                await canal.send({ components: [container], flags: discord_js_1.MessageFlags.IsComponentsV2 });
            }
            else {
                await interaction.channel.send({ components: [container], flags: discord_js_1.MessageFlags.IsComponentsV2 });
            }
            await interaction.update({
                content: `${isPromocao ? "Promoção" : "Rebaixamento"} aplicado com sucesso!`,
                components: [],
            });
            _functions_1.sessoesUpar.delete(interaction.user.id);
        }
        catch (err) {
            console.error("[select_member_upar] erro:", err);
            if (!interaction.replied) {
                await interaction.reply({ content: "Erro.", flags: discord_js_1.MessageFlags.Ephemeral });
            }
        }
    },
});
//# sourceMappingURL=select_role_upar.js.map