const { Client, Guild } = require("discord.js");
const {} = require("../../Handlers/Commands");

module.exports = {
  name: "guildDelete",
  /**
   * @param {Client} client
   * @param {Guild} guild
   */
  async execute(client, guild) {
    // guild.commands.delete().then(() => console.log(`All application commands have been deleted for ${guild.name}`))
  },
};
