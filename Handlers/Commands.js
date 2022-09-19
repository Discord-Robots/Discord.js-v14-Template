const { DevGuild } = process.env;

async function loadCommands(client) {
  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];
  let developerArray = [];

  const Files = await client.utils.loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command);
    }

    if (!command.data.name)
      return console.error(`Commnd: ${file} doesn't have a name`);
    client.commands.set(command.data.name, command);

    if (command.developer) {
      developerArray.push(command.data.toJSON());
    } else {
      commandsArray.push(command.data.toJSON());
    }
  });
  client.application.commands.set(commandsArray);

  const developerGuild = client.guilds.cache.get(DevGuild);
  developerGuild.commands.set(developerArray);
}

module.exports = { loadCommands };
