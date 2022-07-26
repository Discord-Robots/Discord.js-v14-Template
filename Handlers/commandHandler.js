const { italic } = require("chalk");
client.removeAllListeners();

function loadCommands(client) {
    const { readdirSync } = require("fs");
    let commandsArray = [];
    let developerArray = [];

    const commandsFolder = readdirSync("./Commands");
    let commands = 0
    let devCommands = 0
    for (const folder of commandsFolder) {
        const commandFiles =
            readdirSync(`./Commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);

            client.commands.set(commandFile.data.name, commandFile);

            if (commandFile.developer) {
                developerArray.push(commandFile.data.toJSON());
                devCommands++
            }
            else {
                commandsArray.push(commandFile.data.toJSON());
                commands++
            }

            continue;
        }
    }
    client.application.commands.set(commandsArray).then(
        console.log(italic.greenBright(`${commands} Global Command(s) Loaded`))
    );
    const developerGuild = client.guilds.cache.get(process.env.dev);
    developerGuild.commands.set(developerArray).then(
        console.log(italic.magentaBright(`${devCommands} Developer Command(s) Loaded`))
    );
}

function unloadCommands(client) {
    client.application.commands.set([]);
    const developerGuild = client.guilds.cache.get(process.env.dev);
    developerGuild.commands.set([]);
    return console.log("Unloaded Commands");
}

module.exports = { loadCommands, unloadCommands };
