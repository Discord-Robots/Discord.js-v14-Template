# Discord.js-v14-Template

Discord.js v14 Template based on Lyxcode's Handler

Features:

- Supports Only Slash Commands
- Custom Handler for Components
- Custom Handler for Pagination Embeds
- Supports Discord Together command.

**Logs Everything to the console when starting**

![Imgur](https://i.imgur.com/cP8ooUI.png)

**Easy to Read**

Slash Commands:

- Example Location of command: "./Commands/(category)/command"

```js
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    ownerOnly: boolean, //  whether command can only be used by the bot owner? true or false
    developer: boolean, // weather the command is for developer guild or global: true or false
    data: new SlashCommandBuilder()
        .setName('name') // command name - Must be lowercase!!
        .setDescription('description') // command description
        .setDefalultMemberPermissions(PermissionsBitField.Flags.<permission>), // member permissions
  async execute (interaction, client) => {
    // Code here
  },
};
```

SubCommands:

- Example Location of subcommand: "./Commands/(category)/(command)/subcommand"

```js
module.exports = {
    subCommand: "commandName.subcommandName",
    async execute (interaction, client) => {
        // Code here
    },
};
```

Components:

- Example Location of component: "./src/components/(type)/(category)/(command)/(component)"
- type: button/ select menu/ modal
- category: should match the command category
- command: folder is named the same as the command name
- component: file that matches the custom id that you created
  - This long path just helps to know which command the component belongs to.

```js
module.exports = {
    data: {
      id: "custom_id", // Must be lowercase
    },
  async execute (interaction, client) => {
    // Code here
  },
};
```

# Getting Started

Click `Use this template` at the top of this page or fork the repo to your own profile.

- Rename `.env.example` to `.env` (THIS FILE CANNOT HAVE ANY SPACES)

  - REQUIRED:

    - Paste in your `BotToken`, `AppID`, `ClientSecret` from the [Discord Developer Portal](https://discord.com/developers/applications)
    - Insert your Developer Guild ID for testing purposes in `DevGuild`
    - Insert your own UserID as `BotOwnerID`
      - If this is not done, commands with `ownerOnly` will not function and your project will error and crash.
    - Insert your mongoose connection string as `Connect`, Get your free connection string [Here](https://www.mongodb.com/)
      - If you don't know how to get this string, there are videos on this like [this one](https://tinyurl.com/mongo-setup)

- After you have edited and saved the `env` file to your needs, you are ready ready to start the bot!

  - Install all dependencies with `npm install` << Remember, DO NOT INCLUDE ANY PACKAGE NAMES HERE!
  - Run the bot with `nodemon`.
  - Customize the project to your liking and enjoy!

Found any bugs or have any suggestion about the template? Create an issue or pull request!
