const { CommandInteraction, ContextMenuCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ContextMenuCommandInteraction} interaction
     */
    async execute(interaction, client) {
        if (interaction.isUserContextMenuCommand()) {
            await interaction.deferReply({ fetchReply: true }).catch((e) => { });
            const command = client.commands.get(interaction.commandName);
            if (command) command.execute(interaction, client);
        }
        // command.execute(interaction, client);
    }
}