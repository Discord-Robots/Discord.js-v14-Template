require("dotenv/config");
const { Client, Collection } = require("discord.js");
const Util = require("./Structures/Utils");
const { BotToken } = process.env;
const { loadEvents } = require("./Handlers/Events");
const { loadCommands } = require("./Handlers/Commands");
const wait = require("node:timers/promises").setTimeout;
const chalk = require("chalk");

const client = new Client({
  intents: 131071,
  partials: [require("./Structures/config.json").partials],
});

client.config = require("./Structures/config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.utils = new Util(client);
client.cooldowns = {
  commands: new Collection(),
};

(async () => {
  await client.login(BotToken).then(async () => {
    console.log(
      chalk.italic.bold.yellowBright(
        `${client.user.tag} has looged into Discord. `
      )
    );
    await wait(500);
    await loadEvents(client);
    loadCommands(client);
  });
})();

module.exports = client;
