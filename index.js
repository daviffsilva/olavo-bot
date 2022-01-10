// import Bot from './discord-bot/index.js';
const Bot = require('./discord-bot/index');
const express = require('express');

const PORT = process.env.PORT || 5000

let app = express();
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
app.get('/', (req, res) => {
  res.send('');
})
  
const DISCORD_BOT = new Bot();