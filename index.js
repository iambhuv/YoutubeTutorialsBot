const { Client, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

const { readdirSync } = require("fs");

const handlers = readdirSync("./handlers/").filter((f) => f.endsWith(".js"));

handlers.forEach((hanlder) => {
  require(`./handlers/${hanlder}`)(client);
});

client.login(process.env.CLIENT_ID);
