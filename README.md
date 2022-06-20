# Birthday Bot
This is a simple Discord bot built with cloudflare [workers](https://workers.cloudflare.com/) that sends birthday messages to people on their birthday. This bot is **NOT** built for a large bot so should only be used within small servers. The bot stores its data with cloudflare's [KV storage](https://developers.cloudflare.com/workers/runtime-apis/kv/).

## Devlelopment
To run the bot locally, first clone this repository with:
```
git clone https://github.com/Toffee1347/bday-bot
```
You'll need to have [wrangler](https://developers.cloudflare.com/workers/wrangler/) installed to run on workers. Within wrangler, you need to create a worker then copy the contents from [wrangler.example.toml](wrangler.example.toml) to wrangler.toml (and add name and KV id).

Next add the secrets needed with (only do this if planning to run the bot on workers):
```
wrangler secret put <NAME> <VALUE>
```
The two secrets needed are `token` and `discord_public_key` (these are both for the runtime and only used in production)

The next variables needed are stored in `.env`
Rename `.env.example` to `.env` and add the contents listed, all variables prefixed with `production_` are only needed when deploying production commands to Discord

Then run the following command to install all packages needed:
```
npm i
```

# Registering commands
The file used to register commands is [deploy-commands.js](src/deploy-commands.js)
To run the file, run the following command:
```
node src/deploy-commands.js
```
Add the following options to change how it runs (If not specified, the file will have the opposite effect):
- `--production` or `-p`: Register commands using the variabled prefixed with `production_`
- `--global` or `-g`: Register commands globally and not just in the server under `guild_id`
- `--reset` or `-r`: When registering commands on a guild, resets global commands

# Running the bot

Run the following command to start the bot:
```
npm run devstart
```
This will run the bot with:
- [Nodemon](https://nodemon.io/): When any changes are made to files, restarts the bot automatically
- [Miniflare](https://miniflare.dev/): Makes a workers environment with extra features like triggering cron jobs

# Triggering a cron job
To trigger the birthday cron job, run the following command (assuming the bot is running):
```
curl "http://localhost:8787/cdn-cgi/mf/scheduled"
```

# Deploying to production
To deploy to production, run the following command:
```
npm run publish
```
