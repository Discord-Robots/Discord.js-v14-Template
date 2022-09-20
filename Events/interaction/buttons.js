const { ButtonInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        const button = components.buttons.get(interaction.customId);

        try {
            await button.execute(interaction, client);
        } catch (error) {
            throw new Error(`No code for this button!`)
        }
    }
}