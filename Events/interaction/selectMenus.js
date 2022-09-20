const { SelectMenuInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {SelectMenuInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isSelectMenu()) return;
        const selectMenu = components.selectMenus.get(interaction.customId);

        try {
            await selectMenu.execute(interaction, client);
        } catch (error) {
            throw new Error(`No code for this select menu!`)
        }
    }
}