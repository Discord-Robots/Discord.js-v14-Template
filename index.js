require("dotenv/config");
const { Client, Partials, GatewayIntentBits: Intents, Collection } = require('discord.js');
const { DirectMessageReactions, DirectMessageTyping, DirectMessages, GuildBans, GuildEmojisAndStickers, GuildIntegrations, GuildInvites, GuildMembers, GuildMessageReactions, GuildMessageTyping, GuildMessages, GuildPresences, GuildScheduledEvents, GuildVoiceStates, GuildWebhooks, Guilds, MessageContent } = Intents;
const { Channel, GuildMember, GuildScheduledEvent, Message, Reaction, ThreadMember, User } = Partials;
const Util = require("./Structures/Utils");
const chalk = require("chalk");

const { loadEvents, unloadEvents } = require("./Handlers/eventHandler");
const { loadCommands, unloadCommands } = require("./Handlers/commandHandler");

const client = new Client({
    intents: [DirectMessageReactions, DirectMessageTyping, DirectMessages, GuildBans, GuildEmojisAndStickers, GuildIntegrations, GuildInvites, GuildMembers, GuildMessageReactions, GuildMessageTyping, GuildMessages, GuildPresences, GuildScheduledEvents, GuildVoiceStates, GuildWebhooks, Guilds, MessageContent],
    partials: [Channel, GuildMember, GuildScheduledEvent, Message, Reaction, ThreadMember, User],
});

client.config = require("./Structures/config.json");
client.commands = new Collection();
client.utils = new Util(client);

client
    .login(process.env.token)
    .then(() => {
        loadEvents(client);
        loadCommands(client);
    })
    .catch(err => console.log(err))

module.exports = client;
