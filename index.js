// import Bot from './discord-bot/index.js';
const Bot = require('./discord-bot/index');
const express = require('express');

const PORT = process.env.PORT || 5000

express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const DISCORD_BOT = new Bot();