const { Client } = require("discord.js");
const { italic } = require("chalk");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(italic.bold.yellowBright(`Client logged in as ${client.user.tag}.`))
        client.user.setPresence({
            activities: [{ name: "/commands", type: 5 }],
            status: "dnd",
        });
    }
}