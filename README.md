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

This bot is not set to public, but you can set up your own instance by following these instructions.

### Prerequisites

- Node.js 12.0.0 or newer
- PostgreSQL

### Discord setup

- [Create a bot application for Discord](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- [Invite the bot to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)

### Environment

The app needs the following environment variables to be set:

- DISCORD_TOKEN - the token for the bot you created in the step above
- PGHOST - database host (default: 'localhost')
- PGUSER - database user (default: process.env.USER)
- PGDATABASE - database name (default: process.env.USER)
- PGPASSWORD - database password (default: null)
- PGPORT - database port (default: 5432)

For a development environment, you can set these in a `.env` file:

```
DISCORD_TOKEN=xxxx
PGDATABASE=mydatabasename
...
```

### Running the app

Run the app with:

```
node index.js
```

For a development environment, you may want to run with [nodemon](https://github.com/remy/nodemon) for auto-reloading:

```
nodemon index.js
```

## License

[MIT](LICENSE)
