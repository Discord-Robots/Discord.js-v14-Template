const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  Client,
} = require("discord.js");

const { loadCommands, unloadCommands } = require("../../Handlers/Commands");
const { loadEvents, unloadEvents } = require("../../Handlers/Events");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your events/command")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Reload your events")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Reload your commands")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!client.config.owners.includes(interaction.member.id)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `\\📛 **Error:** \\📛\n You cannot use that command!`
            )
            .setColor("Red"),
        ],
        ephemeral: true,
      });
    } else {
      const sub = interaction.options.getSubcommand();
      try {
        switch (sub) {
          case "events": {
            unloadEvents(client);
            loadEvents(client);
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setDescription(
                    `\\✅ **Success:** \\✅\n Reloaded the events! `
                  )
                  .setColor("Green"),
              ],
              ephemeral: true,
            });
          }

            break;
          case "commands": {
            unloadCommands(client);
            loadCommands(client);
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setDescription(
                    `\\✅ **Success:** \\✅\n Reloaded the commands! `
                  )
                  .setColor("Green"),
              ],
              ephemeral: true,
            });
            break;
          }
        }
      } catch (error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`\\📛 **Error:** \\📛\n ${error.message} `)
              .setColor("Red"),
          ],
          ephemeral: true,
        });
      }
    }
  }
}