const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    try {
      if (!command) {
        return interaction.reply({
          content: "This command is outdated",
          ephemeral: true,
        });
      }
      if (command.ownerOnly && client.utils.checkOwner(interaction.user.id)) {
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
      }

      const subCommand = interaction.options.getSubcommand(false);
      if (subCommand) {
        const subCommandFie = client.subCommands.get(
          `${interaction.commandName}.${subCommand}`
        );
        if (!subCommandFie) {
          return interaction.reply({
            content: "This sub command is outdated",
            ephemeral: true,
          });
        }
        subCommandFie.execute(interaction, client);
      } else command.execute(interaction, client);
    } catch (error) {
      console.log(error);
    }
  },
};
