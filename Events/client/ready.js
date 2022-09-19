const { Client } = require("discord.js");
const { loadCommands } = require("../../Handlers/Commands");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    await loadCommands(client);
    console.log(
      client.chalk.italic.bold.yellowBright(
        `${client.user.tag} has looged into Discord. `
      )
    );
    client.user.setPresence({
      activities: [{ name: "/commands", type: 5 }],
      status: "dnd",
    });
    await client.utils.dbConnect();
    await client.utils.logger();
  },
};
