const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  ContextMenuCommandInteraction,
} = require("discord.js");
module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("contextAvatar")
    .setType(ApplicationCommandType.User),
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    const target = interaction.options.getUser("user") || interaction.user;
    await target.fetch();

    const AvatarEmbed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`${target.tag}'s Avatar`)
      .setImage(target.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({
        text: `Requested By: ${target.username}`,
        iconURL: target.displayAvatarURL({ dynamic: true }),
      });
    return await interaction.editReply({
      embeds: [AvatarEmbed],
      ephemeral: true,
    });
  },
  catch(error) {
    console.log(error);
    return interaction.editReply({
      content: "Something went wromg...",
      ephemeral: true,
    });
  },
};
