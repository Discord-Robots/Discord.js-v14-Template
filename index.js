require("dotenv/config");
const { Client, Collection } = require("discord.js");
const Util = require("./Structures/Utils");
const { BotToken } = process.env;
const { loadEvents } = require("./Handlers/Events");
const chalk = require("chalk");

const client = new Client({
  intents: 3276799,
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
client.chalk = chalk;

(async () => {
  await loadEvents(client);
  await client.login(BotToken);
})();

module.exports = client;
