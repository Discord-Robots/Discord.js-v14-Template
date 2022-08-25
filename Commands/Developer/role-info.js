const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    CommandInteraction,
    Client
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("role-info")
        .setDescription("Tells you who has the role mentioned/ how many people have it.")
        .addSubcommand(options => options
            .setName("amount").setDescription("I will only get the amount of users with the role provided.")
            .addRoleOption((options) =>
                options
                    .setName("role")
                    .setDescription("Select a role")
                    .setRequired(true)
            )
        )
        .addSubcommand(options => options
            .setName("users").setDescription("Returns the tags of users who have the provided role.")
            .addRoleOption((options) =>
                options
                    .setName("role")
                    .setDescription("Select a role")
                    .setRequired(true)
            )
        ),
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, guild } = interaction;

        const sub = options.getSubcommand();
        const role = options.getRole("role");
        await guild.members.fetch();
        const MembersInRole = guild.roles.cache
            .find((r) => r.id === role.id)
            .members.map((m) => m.user.tag);


        switch (sub) {
            case "amount":
                interaction.reply({ content: `${MembersInRole.length} members have role: **${role.name}**`, ephemeral: true })
                break;
            case "users":
                interaction.reply({ content: `Members with role (**${role.name}**): [${MembersInRole.join(", ")}]`, ephemeral: true })
                break;

            default:
                return;
        }
    },
};