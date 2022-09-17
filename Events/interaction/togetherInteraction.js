const { SelectMenuInteraction, Client } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {Client} client
   * @param {SelectMenuInteraction} interaction
   */
  async execute(interaction, client) {
    // Discord Together/Activities
    if (interaction.isSelectMenu() && interaction.customId === "together") {
      if (interaction.member.voice.channelId) {
        try {
          await fetch(
            `https://discord.com/api/v8/channels/${interaction.member.voice.channelId}/invites`,
            {
              method: "POST",
              body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: interaction.values[0],
                target_type: 2,
                temporary: false,
                validate: null,
              }),
              headers: {
                Authorization: `Bot ${client.token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((invite) => {
              if (
                invite.error ||
                !invite.code ||
                Number(invite.code) === 50013
              ) {
                return console.log(
                  `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
                );
              }
              interaction.channel.send(
                `${interaction.member} https://discord.com/invite/${invite.code}`
              );
              interaction.deferUpdate();
            });
        } catch (err) {
          console.log(
            `(${interaction.guild.name}) An error occurred while starting activity id ${interaction.values[0]}`
          );
        }
      }
    }
  },
};
