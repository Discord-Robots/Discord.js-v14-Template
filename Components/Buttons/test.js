const { ButtonInteraction, Client } = require("discord.js");

module.exports = {
    id: "test",
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.update({
            embeds: [],
            components: [],
            content: 'You clicked my button, I will disappear soon!'
        }),
            setTimeout(async () => {
                await interaction.deleteReply()
            }, 3000);
    }
}