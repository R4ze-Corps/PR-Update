import { MessageFlags } from "discord.js";
import { createContainer } from "@magicyan/discord";
import { sessoesUpar, getAllRoleIds, gerenciaRoleIds, GERAIS_ROLE_ID, CANAL_DESTINO_ID } from "#functions";

function localCreateResponder(cfg: any) { return cfg; }

export default localCreateResponder({
  customId: "upar/select_member",
  types: ["StringSelectMenu" as any],
  cache: "cached",
  async run(interaction: any) {
    try {
      const memberId = interaction.values[0];
      const sessao = sessoesUpar.get(interaction.user.id);
      if (!sessao || !sessao.roleId) {
        return interaction.reply({ content: "Sessão expirada.", flags: MessageFlags.Ephemeral });
      }

      const targetMember = await interaction.guild.members.fetch(memberId).catch(() => null);
      if (!targetMember) {
        return interaction.reply({ content: "Membro não encontrado.", flags: MessageFlags.Ephemeral });
      }

      const newRoleId = sessao.roleId;
      const isPromocao = sessao.tipo === "PROMOÇÃO";
      const isGerencia = gerenciaRoleIds.has(newRoleId);

      const allIds = getAllRoleIds();
      await targetMember.roles.remove(allIds).catch(console.error);
      await targetMember.roles.add(newRoleId).catch(console.error);

      if (isPromocao && isGerencia) {
        await targetMember.roles.add(GERAIS_ROLE_ID).catch(console.error);
      }
      if (!isPromocao && !isGerencia) {
        await targetMember.roles.remove(GERAIS_ROLE_ID).catch(console.error);
      }

      const texto = isPromocao
        ? `**HUHU! TEMOS NOVIDADES! 🥳**\n\nParabéns, <@${memberId}>! Seu esforço e dedicação brilharam tanto que você acaba de subir de nível! ✨\n\n**🎖️ Novo Cargo:** <@&${newRoleId}>\n\nEstamos muito felizes em ver seu crescimento por aqui. Continue com esse brilho e vamos juntos! 🚀💖`
        : `**Opa, passando para dar um aviso! ✨**\n\nOlá, <@${memberId}>, informamos que seu cargo foi atualizado para <@&${newRoleId}>.\n\nNão desanime! As portas continuam abertas e estamos aqui para te apoiar a subir de novo em breve. Qualquer dúvida, é só chamar a gente! ✨🌸`;

      const container = createContainer(
        isPromocao ? "#57F287" : "#ED4245",
        texto,
      );

      const canal = interaction.guild.channels.cache.get(CANAL_DESTINO_ID);
      if (canal) {
        await canal.send({ components: [container as any], flags: MessageFlags.IsComponentsV2 });
      } else {
        await interaction.channel.send({ components: [container as any], flags: MessageFlags.IsComponentsV2 });
      }

      await interaction.update({
        content: `${isPromocao ? "Promoção" : "Rebaixamento"} aplicado com sucesso!`,
        components: [],
      });

      sessoesUpar.delete(interaction.user.id);
    } catch (err) {
      console.error("[select_member_upar] erro:", err);
      if (!interaction.replied) {
        await interaction.reply({ content: "Erro.", flags: MessageFlags.Ephemeral });
      }
    }
  },
});
