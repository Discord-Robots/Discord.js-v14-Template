const { Client } = require("discord.js");
const chalk = require("chalk");
const mongoose = require("mongoose");
const ms = require("ms");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log(
      chalk.italic.bold.yellowBright(`Client logged in as ${client.user.tag}. `)
    );

    client.user.setPresence({
      activities: [{ name: "/commands", type: 5 }],
      // status: "dnd",
      clientStatus: "mobile"
    });
    //DATABASE READY
    if (process.env.CONNECT) {
      const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        connectTimeoutMS: 10000,
        family: 4,
      };

      mongoose.connect(process.env.CONNECT, dbOptions);
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
    } else
      return console.log(
        `No connection string in your environment. Please set! \nIf you don't want to use a database, remove lines 22-53 in \`./Events/client/ready.js\``
      );
  },
};
