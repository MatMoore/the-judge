require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const replyHelp = (message) => {
  message.reply(`valid commands are:
"!help" - print this message
"!scores" - print the scores
"!give X points to @user" - award points
  `);
};

const replyScores = (message) => {
  message.reply(`Placeholder scores`);
};

client.on("message", (message) => {
  if (message.author.bot) {
    return;
  }

  const pointsCommand = /!give (\d+(\.\d+)?) points/i;

  if (message.content === "!ping") {
    message.reply("pong");
    return;
  }

  if (message.content === "!scores") {
    replyScores(message);
    return;
  }

  if (message.content === "!help") {
    replyHelp(message);
    return;
  }

  if (message.content.startsWith("!give")) {
    const result = pointsCommand.exec(message.content);
    if (result === null) {
      message.reply("your request is DENIED. Try: !give 100 points to @human'");
      return;
    }

    const numberOfPoints = result[1];

    const mentions = message.mentions.users.array();

    if (mentions.length === 0) {
      message.reply("your request is DENIED. Try: !give 100 points to @human'");
      return;
    }

    message.reply(`Placeholder ${numberOfPoints}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
