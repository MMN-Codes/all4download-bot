const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const fs = require('fs');

const { downloadVideo } = require('./downloader');
const { addUser, getUser } = require('./referral');

const bot = new Telegraf(process.env.BOT_TOKEN);

// 🌐 Web server (Render keep alive)
const app = express();
app.get('/', (req, res) => res.send('Bot running 🚀'));
app.listen(3000);

// 🚀 START
bot.start((ctx) => {
  const userId = ctx.from.id;
  const ref = ctx.startPayload;

  addUser(userId, ref);

  ctx.reply(
    `🔥 Welcome!\n\nSend any video link\n\n💰 Coins: ${getUser(userId).coins}`
  );
});

// 👤 PROFILE
bot.command('profile', (ctx) => {
  const user = getUser(ctx.from.id);

  ctx.reply(`👤 Your Coins: ${user.coins}`);
});

// 📥 LINK HANDLE
bot.on('text', async (ctx) => {
  const url = ctx.message.text;

  if (!url.startsWith('http')) return;

  ctx.reply(
    '🎯 Select Quality:',
    Markup.inlineKeyboard([
      [Markup.button.callback('360p', `q_360_${url}`)],
      [Markup.button.callback('720p', `q_720_${url}`)],
      [Markup.button.callback('Audio', `q_audio_${url}`)]
    ])
  );
});

// 🎯 QUALITY HANDLER
bot.action(/q_(.+)/, async (ctx) => {
  const data = ctx.callbackQuery.data.split('_');

  const quality = data[1];
  const url = data.slice(2).join('_');

  const fileName = `video_${Date.now()}.mp4`;

  await ctx.reply('⏳ Downloading...');

  try {
    await downloadVideo(url, fileName, quality);

    await ctx.replyWithVideo(
      { source: fileName },
      { caption: '🚀 @All4DownloadBot' }
    );

    fs.unlinkSync(fileName);
  } catch (err) {
    console.log(err);
    ctx.reply('❌ Failed');
  }
});

// 🚀 LAUNCH
bot.launch();

console.log('Bot started...');
