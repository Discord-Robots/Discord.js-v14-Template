const { Client } = require("discord.js");
const chalk = require("chalk");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log(
      chalk.italic.bold.yellowBright(`Client logged in as ${client.user.tag}. `)
    );

    client.user.setPresence({
      activities: [{ name: "/commands", type: 5 }],
      status: "dnd",
    });

    //DATABASE READY
    if (process.env.Connect) {
      const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        connectTimeoutMS: 10000,
        family: 4,
      };

      mongoose.connect(process.env.Connect, dbOptions);
      mongoose.Promise = global.Promise;

      mongoose.connection.on("connected", () => {
        console.log(
          chalk.magenta.italic("Mongoose has successfully connected!")
        );
      });

      mongoose.connection.on("err", (err) => {
        console.error(
          chalk.red.bold(`Mongoose connection error: \n${err.stack}`)
        );
      });

      mongoose.connection.on("disconnected", () => {
        console.warn(chalk.red.italic("Mongoose connection lost"));
      });
    } else return console.log(`No connection string in your environment.`);
  },
};
