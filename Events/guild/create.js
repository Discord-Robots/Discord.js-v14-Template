const { Client, Guild } = require("discord.js");

module.exports = {
    name: "guildCreate",
    /**
     * @param {import("../../index")} client
     * @param {Guild} guild 
     */
    async execute(client, guild) {
        client.application?.commands.cache.map(cmd => {
            console.log(cmd)
            // guild.commands.set([cmd]).then((a) => console.log(`"${a.name}" loaded in Guild: ${guild.id}`))
        });
    }
}