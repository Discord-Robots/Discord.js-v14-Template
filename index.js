require("dotenv/config");
const { Client, Collection } = require("discord.js");
const Util = require("./Structures/Utils");
const chalk = require("chalk");

const { loadEvents, unloadEvents } = require("./Handlers/Events");
const { loadCommands, unloadCommands } = require("./Handlers/Commands");

const client = new Client({
  intents: [require("./Structures/config.json").intents],
  partials: [require("./Structures/config.json").partials],
  fetchAllMembers: true
});

client.config = require("./Structures/config.json");
client.commands = new Collection();
client.utils = new Util(client);

client
  .login(process.env.token)
  .then(() => {
    loadEvents(client, chalk);
    loadCommands(client, chalk);
  })
  .catch((err) => console.log(err));

module.exports = client;
