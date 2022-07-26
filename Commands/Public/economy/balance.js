const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    Client
} = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Gets a users coin balance")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        interaction.reply({ content: '0', ephemeral: true });
    },
};
