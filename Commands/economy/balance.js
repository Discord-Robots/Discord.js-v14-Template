const {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Gets a users coin balance")
    .addUserOption((options) =>
      options
        .setName("user")
        .setDescription("Pick a user to see their balance.")
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    const { options } = interaction;
    const user = options.getUser("user");
    interaction.reply({ content: "0", ephemeral: true });
  },
};
