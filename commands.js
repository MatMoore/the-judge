const SCORES_COMMAND = "!scores";
const GIVE_COMMAND = "!give";
const HELP_COMMAND = "!help";
const DO_NOTHING = null;

const parseCommands = (message) => {
  if (message.author.bot) {
    return { command: DO_NOTHING };
  }

  if (message.content.startsWith(SCORES_COMMAND)) {
    return parseScores(message);
  }

  if (message.content.startsWith(GIVE_COMMAND)) {
    return parseGive(message);
  }

  if (message.content.startsWith(HELP_COMMAND)) {
    return { command: HELP_COMMAND };
  }
};

const parseScores = (message) => {
  if (message.content === SCORES_COMMAND) {
    return { command: SCORES_COMMAND };
  }

  return {
    error: "if you want the scores, just say '!scores'",
  };
};

const parseGive = (message) => {
  const pointsCommand = /!give (\d+(\.\d+)?) points/i;
  const helpMessage = {
    error: "your request is DENIED. Try: !give 100 points to @human'",
  };

  const result = pointsCommand.exec(message.content);
  if (result === null) {
    return helpMessage;
  }

  const numberOfPoints = result[1];

  const mentions = message.mentions.users.array();

  if (mentions.length === 0) {
    return helpMessage;
  }

  return {
    command: GIVE_COMMAND,
    mentions: mentions,
    numberOfPoints: numberOfPoints,
    author: message.author,
  };
};

module.exports = {
  parseCommands,
  commands: { SCORES_COMMAND, GIVE_COMMAND, HELP_COMMAND },
};
