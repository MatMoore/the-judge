const { parseCommands, commands } = require("./commands");

test("!help is recognised", () => {
  const message = {
    content: "!help",
    author: {
      bot: false,
    },
  };

  expect(parseCommands(message)).toEqual({
    command: "!help",
  });
});

test("!scores is recognised", () => {
  const message = {
    content: "!scores",
    author: {
      bot: false,
    },
  };

  expect(parseCommands(message)).toEqual({
    command: "!scores",
  });
});

test("bots can't send commands", () => {
  const message = {
    content: "!scores",
    author: {
      bot: true,
    },
  };

  expect(parseCommands(message)).toEqual({
    command: null,
  });
});

test("!give is recognised", () => {
  const mentions = [
    {
      id: 1,
      username: "Gryffindor",
    },
  ];

  const author = {
    bot: false,
  };

  const message = {
    content: "!give 100 points to Gryffindor for saving Hogwarts",
    author: author,
    mentions: {
      users: {
        array: jest.fn(() => mentions),
      },
    },
  };

  expect(parseCommands(message)).toEqual({
    command: "!give",
    numberOfPoints: "100",
    mentions: mentions,
    author: author,
  });
});

test("can't give points without mentioning a user", () => {
  const mentions = [];

  const author = {
    bot: false,
  };

  const message = {
    content: "!give 100 points to Gryffindor",
    author: author,
    mentions: {
      users: {
        array: jest.fn(() => mentions),
      },
    },
  };

  expect(parseCommands(message)).toEqual({
    error: "your request is DENIED. Try: !give 100 points to @human'",
  });
});
