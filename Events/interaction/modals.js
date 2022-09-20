const { ModalSubmitInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ModalSubmitInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isModalSubmit()) return;
        const modal = components.modals.get(interaction.customId);

        try {
            await modal.execute(interaction, client);
        } catch (error) {
            throw new Error(`No code for this modal!`)
        }
    }
}