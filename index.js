require("dotenv").config();

const Discord = require("discord.js");
const { Client } = require("pg");
const { ScoreDatabase } = require("./data");
const { parseCommands, commands } = require("./commands");

const discord = new Discord.Client();
const db = new Client();
const scoreDatabase = new ScoreDatabase(db);

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
  const result = await scoreDatabase.scores();
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
};

const replyGive = async (message, { mentions, numberOfPoints, author }) => {
  await mentions.forEach(async (mention) => {
    let actualPoints;
    if (author.id === mention.id) {
      actualPoints = -numberOfPoints;
    } else {
      actualPoints = numberOfPoints;
    }

    await scoreDatabase.increment(mention.id, mention.username, actualPoints);
    message.reply(`${actualPoints} points to ${mention.username}!`);
  });
};

discord.on("message", async (message) => {
  result = parseCommands(message);

  if (result.error !== undefined) {
    message.reply(result.error);
    return;
  }

  if (result.command === commands.HELP_COMMAND) {
    replyHelp(message);
    return;
  }

  if (result.command === commands.SCORES_COMMAND) {
    await replyScores(message);
    return;
  }

  if (result.command === commands.GIVE_COMMAND) {
    await replyGive(message, result);
    return;
  }
});

discord.login(process.env.DISCORD_TOKEN);
