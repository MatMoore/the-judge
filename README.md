# The Judge

![The Judge in The Good Place](images/the-good-place-2-judge.jpg)

A discord bot to run a points system on your server.

## Commands

Say "!help" at any time to print the list of commands.

### !scores

Print the scores

### !give

Awards points. You can award any number of points.

Format: `!give {number} points to {user}[...]`

For example:

```
!give 100 points to @user
```

```
!give 0.0000001 points to @user for participating
```

## Setup instructions

### Prerequisites

- Node.js 12.0.0 or newer
- PostgreSQL

### Discord setup

- [Create a bot application for Discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- [Invite the bot to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)

### Environment

The app needs the following environment variables to be set:

- DISCORD_TOKEN - the token for the bot you created in the step above

When running the app locally, you can set these in a `.env` file:

```
DISCORD_TOKEN=xxxx
```

### Running the app

## License

[MIT](LICENSE)
