import { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } from "discord.js";
import { Command } from "#base";
import { createContainer } from "@magicyan/discord";

export default new Command({
  name: "upar",
  description: "Promover ou rebaixar um membro.",
  type: ApplicationCommandType.ChatInput,
  async run(interaction: any) {
    try {
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("upar/promover")
          .setLabel("Promover")
          .setEmoji("📈")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("upar/rebaixar")
          .setLabel("Rebaixar")
          .setEmoji("📉")
          .setStyle(ButtonStyle.Danger),
      );

      const container = createContainer(
        "#2b2d31",
        "**GESTÃO DE MEMBROS**\nSelecione uma das opções abaixo para gerenciar a hierarquia de um membro.",
        row,
      );

      await interaction.reply({
        components: [container as any],
        flags: MessageFlags.IsComponentsV2,
      });
    } catch (err) {
      console.error("[Upar] erro:", err);
      if (!interaction.replied) {
        await interaction.reply({ content: "Erro.", ephemeral: true });
      }
    }
  },
});
