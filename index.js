require("dotenv").config();

const Discord = require("discord.js");
const { Client } = require("pg");
const { ScoreFetcher } = require("./data");

const discord = new Discord.Client();
const db = new Client();
const scoreFetcher = new ScoreFetcher(db);

db.connect();

const createTable = `
  create table if not exists scores(
    id bigint primary key,
    username varchar,
    score double precision
  )
`;

db.query(createTable, (err, res) => {
  if (err) {
    console.log(err.stack);
  }
});

discord.on("ready", () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});

const replyHelp = (message) => {
  message.reply(`valid commands are:
"!help" - print this message
"!scores" - print the scores
"!give X points to @user" - award points
  `);
};

const replyScores = async (message) => {
  const result = await scoreFetcher.scores();
  const rows = result.rows;
  if (rows.length === 0) {
    message.reply("no points have been awarded yet!");
    return;
  }

  const response = ["here is the current scoreboard:", ""];
  rows.forEach((row, i) => {
    response.push(`${i + 1}. ${row.username} with ${row.score} points`);
  });

  message.reply(response.join("\n"));
  console.log(result);
};

discord.on("message", async (message) => {
  if (message.author.bot) {
    return;
  }

  const pointsCommand = /!give (\d+(\.\d+)?) points/i;

  if (message.content === "!ping") {
    message.reply("pong");
    return;
  }

  if (message.content === "!scores") {
    await replyScores(message);
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

discord.login(process.env.DISCORD_TOKEN);
