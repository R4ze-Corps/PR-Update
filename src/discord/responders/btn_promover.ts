import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { sessoesUpar, cargosPromocao } from "#functions";

function localCreateResponder(cfg: any) { return cfg; }

export default localCreateResponder({
  customId: "upar/promover",
  types: ["Button" as any],
  cache: "cached",
  async run(interaction: any) {
    try {
      sessoesUpar.set(interaction.user.id, { tipo: "PROMOÇÃO" });

      const options = cargosPromocao.map(c =>
        new StringSelectMenuOptionBuilder()
          .setLabel(c.nome)
          .setValue(c.id)
          .setEmoji("📈")
      );

      const select = new StringSelectMenuBuilder()
        .setCustomId("upar/select_role")
        .setPlaceholder("Selecione o novo cargo para o membro...")
        .addOptions(options);

      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(select)],
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error("[btn_promover] erro:", err);
      if (!interaction.replied) {
        await interaction.reply({ content: "Erro.", flags: MessageFlags.Ephemeral });
      }
    }
  },
});
