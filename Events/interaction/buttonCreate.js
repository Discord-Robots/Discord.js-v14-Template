const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isButton) return;
    },
};
