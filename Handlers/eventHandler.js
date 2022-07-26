const { readdirSync } = require("fs");
const { italic } = require("chalk");

function loadEvents(client) {
    const folders = readdirSync("./Events");
    let count = 0;
    for (const folder of folders) {
        const files =
            readdirSync(`./Events/${folder}`)
                .filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
            count++;
            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client)
                    );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client))
                else client.on(event.name, (...args) => event.execute(...args, client))
            }

            continue;
        }
    }
    return console.log(italic.blue(count + " Events Loaded"));
}

function unloadEvents(client) {
    return console.log("Unloaded Events");
}

module.exports = { loadEvents, unloadEvents };