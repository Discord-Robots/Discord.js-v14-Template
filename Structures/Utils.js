const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Guild = require("./models/guild");

module.exports = class Utils {
  /**
   *
   * @param {*} client
   * @param {ChatInputCommandInteraction} interaction
   */
  constructor(client, interaction) {
    this.client = client;
    interaction;
  }

  async guild(guildID, guildName) {
    const guild = await Guild.findOne({
      gID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        gID: guildID,
        gName: guildName,
      });
      newData.save();
      return newData;
    } else {
      return guild;
    }
  }

  async getSetup(guildID) {
    const setup = await Guild.findOne({
      gID: guildID,
    });
    return setup;
  }

  checkOwner(user) {
    return process.env.BotOwnerID !== user;
  }

  errorEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\📛 **Error:** \\📛\n ${message} `)
          .setColor("Red"),
      ],
      ephemeral: true,
    });
  }

  successEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\✅ **Success:** \\✅\n ${message}  `)
          .setColor("Green"),
      ],
      ephemeral: true,
    });
  }
};
