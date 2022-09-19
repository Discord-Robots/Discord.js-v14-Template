const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Guild = require("./models/guild");
const { glob } = require("glob");
const { promisify } = require("util");
const PG = promisify(glob);
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

module.exports = class Utils {
  /**
   *
   * @param {*} client
   * @param {ChatInputCommandInteraction} interaction
   */
  constructor(client, interaction) {
    this.client = client;
    interaction;
  }

  async guild(guildID, guildName) {
    const guild = await Guild.findOne({
      gID: guildID,
    });
    if (!guild) {
      const newData = new Guild({
        gID: guildID,
        gName: guildName,
      });
      newData.save();
      return newData;
    } else {
      return guild;
    }
  }

  async getSetup(guildID) {
    const setup = await Guild.findOne({
      gID: guildID,
    });
    return setup;
  }

  checkOwner(user) {
    return process.env.BotOwnerID !== user;
  }

  async dbConnect() {
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
  }

  async loadFiles(dirName) {
    const Files = await PG(
      `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
    );
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
  }

  async logger() {
    const eventFiles = await this.loadFiles("./Events");
    let events = 0;
    eventFiles.forEach((file) => {
      const event = require(file);
      if (!event.name)
        return console.error(`Event: ${file} doesn't have a name`);
      events++;
    });
    console.log(chalk.italic.blue(events + " Events Loaded"));

    let devCommands = 0;
    let commands = 0;
    let subs = 0;

    const Files = await this.loadFiles("./Commands");

    Files.forEach((file) => {
      const command = require(file);

      if (command.subCommand) {
        subs++;
      }

      if (command.developer) {
        devCommands++;
      } else {
        commands++;
      }
    });
    console.log(
      chalk.italic.greenBright(`${commands} Global Command(s) Loaded`)
    );

    console.log(
      chalk.italic.magentaBright(`${devCommands} Developer Command(s) Loaded`)
    );

    console.log(chalk.italic.redBright(`${subs} Sub Command(s) Loaded`));
    return this.logger;
  }

  errorEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\📛 **Error:** \\📛\n ${message} `)
          .setColor("Red"),
      ],
      ephemeral: true,
    });
  }

  successEmbed(interaction, message) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`\\✅ **Success:** \\✅\n ${message}  `)
          .setColor("Green"),
      ],
      ephemeral: true,
    });
  }
};
