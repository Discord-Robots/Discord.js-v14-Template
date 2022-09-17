const { DevGuild } = process.env;
const chalk = require("chalk");

async function loadCommands(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  await client.commands.clear();
  await client.subCommands.clear();

  let commandsArray = [];
  let developerArray = [];
  let devCommands = 0;
  let commands = 0;
  let subs = 0;

  const Files = await loadFiles("Commands");

  Files.forEach((file) => {
    const command = require(file);

    if (command.subCommand) {
      subs++; return client.subCommands.set(command.subCommand, command);
    }

    if (!command.data.name)
      return console.error(`Commnd: ${file} doesn't have a name`);
    client.commands.set(command.data.name, command);

    if (command.developer) {
      developerArray.push(command.data.toJSON());
      devCommands++;
    } else {
      commandsArray.push(command.data.toJSON());
      commands++;
    }
  });
  client.application.commands
    .set(commandsArray)
    .then(
      console.log(
        chalk.italic.greenBright(`${commands} Global Command(s) Loaded`)
      )
    );
  const developerGuild = client.guilds.cache.get(DevGuild);
  developerGuild.commands
    .set(developerArray)
    .then(
      console.log(
        chalk.italic.magentaBright(`${devCommands} Developer Command(s) Loaded`)
      )
    );
}

module.exports = { loadCommands };
