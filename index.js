const { Telegraf } = require('telegraf');
const express = require('express');
const { getDownloadLink } = require('./downloader');

const bot = new Telegraf(process.env.BOT_TOKEN);

// 🌐 Express server (Render ke liye)
const app = express();
app.get('/', (req, res) => res.send('Bot running 🚀'));
app.listen(3000, () => console.log('Server running'));

// 🤖 Start command
bot.start((ctx) => {
  ctx.reply('🔥 Send any video link (YouTube, Insta, etc)');
});

// 📥 Link handler
bot.on('text', async (ctx) => {
  const url = ctx.message.text;

  if (!url.startsWith('http')) {
    return ctx.reply('❌ Send a valid link');
  }

  await ctx.reply('⏳ Fetching download link...');

  try {
    const link = await getDownloadLink(url);

    if (!link) {
      return ctx.reply('❌ Download failed, try another link');
    }

    await ctx.reply(`✅ Download:\n${link}`);
  } catch (err) {
    console.log(err);
    ctx.reply('❌ Error occurred');
  }
});

// 🚀 Launch bot
bot.launch();

console.log('Bot started...');
