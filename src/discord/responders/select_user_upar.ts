import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { sessoesUpar, FILTER_ROLE_ID } from "#functions";

function localCreateResponder(cfg: any) { return cfg; }

export default localCreateResponder({
  customId: "upar/select_role",
  types: ["StringSelectMenu" as any],
  cache: "cached",
  async run(interaction: any) {
    try {
      const roleId = interaction.values[0];
      const sessao = sessoesUpar.get(interaction.user.id);
      if (!sessao) {
        return interaction.reply({ content: "Sessão expirada.", flags: MessageFlags.Ephemeral });
      }
      sessao.roleId = roleId;

      await interaction.guild.members.fetch();
      const members = interaction.guild.members.cache.filter((m: any) =>
        m.roles.cache.has(FILTER_ROLE_ID)
      );

      if (members.size === 0) {
        return interaction.update({
          content: "Nenhum membro disponível com o cargo necessário.",
          components: [],
        });
      }

      const options = members.map((m: any) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(m.user.username)
          .setValue(m.id)
          .setDescription(m.user.displayName)
      ).slice(0, 25);

      const select = new StringSelectMenuBuilder()
        .setCustomId("upar/select_member")
        .setPlaceholder("Selecione o membro...")
        .addOptions(options);

      await interaction.update({
        content: "Agora selecione o membro que receberá o cargo:",
        components: [new ActionRowBuilder().addComponents(select)],
      });
    } catch (err) {
      console.error("[select_role_upar] erro:", err);
      if (!interaction.replied) {
        await interaction.reply({ content: "Erro.", flags: MessageFlags.Ephemeral });
      }
    }
  },
});
