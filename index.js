const { Telegraf } = require('telegraf');
const express = require('express');

const { getDownloadLink } = require('./downloader');

const bot = new Telegraf(process.env.BOT_TOKEN);

// 🌐 Web server (Render ke liye)
const app = express();
app.get('/', (req, res) => res.send('Bot running 🚀'));
app.listen(3000);

// 🤖 Start command
bot.start((ctx) => {
  ctx.reply('🔥 Send any video link (YouTube, Insta, Twitter, Pinterest)');
});

// 📥 Link handler
bot.on('text', async (ctx) => {
  const url = ctx.message.text;

  if (!url.startsWith('http')) {
    return ctx.reply('❌ Send a valid link');
  }

  await ctx.reply('⏳ Fetching download link...');

  const data = await getDownloadLink(url);

  if (!data) {
    return ctx.reply('❌ Failed to fetch');
  }

  ctx.reply(`✅ Download here:\n${data}`);
});

// 🚀 Launch bot
bot.launch();

console.log('Bot started...');
