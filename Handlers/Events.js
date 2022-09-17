const chalk = require("chalk");

async function loadEvents(client) {
  const { loadFiles } = require("../Functions/fileLoader");

  await client.events.clear();
  const Files = await loadFiles("Events");
  let count = 0;
  Files.forEach((file) => {
    const event = require(file);
    if (!event.name) return console.error(`Event: ${file} doesn't have a name`);
    const execute = (...args) => event.execute(...args, client);

    client.events.set(event.name, execute);

    count++;
    if (event.rest) {
      if (event.once) client.rest.once(event.name, execute);
      else client.rest.on(event.name, execute);
    } else {
      if (event.once) client.once(event.name, execute);
      else client.on(event.name, execute);
    }
  });
  return console.log(chalk.italic.blue(count + " Events Loaded"));
}

module.exports = { loadEvents };
