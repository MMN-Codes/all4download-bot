const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
const fs = require('fs');
const express = require('express');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// 🌐 Express server (for uptime)
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running 🚀');
});

app.listen(3000, () => {
  console.log('Web server running on port 3000');
});

// 🤖 Bot start
bot.start((ctx) => {
  ctx.reply('🔥 Send any video link (YouTube, Insta, Twitter, Pinterest)');
});

// 📥 Handle links
bot.on('text', async (ctx) => {
  const url = ctx.message.text;

  if (!url.startsWith('http')) {
    return ctx.reply('❌ Please send a valid link');
  }

  await ctx.reply('⏳ Downloading...');

  const fileName = `video_${Date.now()}.mp4`;

  const command = `yt-dlp -f mp4 -o "${fileName}" ${url}`;

  exec(command, async (error) => {
    if (error) {
      console.log(error);
      return ctx.reply('❌ Download failed');
    }

    try {
      await ctx.replyWithVideo({ source: fileName }, {
        caption: '✅ Downloaded via @All4DownloadBot 🚀'
      });

      // 🧹 Delete file after sending
      fs.unlinkSync(fileName);

    } catch (err) {
      console.log(err);
      ctx.reply('⚠️ File too large or error sending');
    }
  });
});

// 🚀 Launch bot
bot.launch();

console.log('Bot started...');
