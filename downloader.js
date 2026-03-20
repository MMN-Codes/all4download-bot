const youtubedl = require('yt-dlp-exec');

async function downloadVideo(url, fileName, quality = 'best') {
  let format = 'best';

  if (quality === '360') format = '18';
  if (quality === '720') format = '22';
  if (quality === 'audio') format = 'bestaudio';

  await youtubedl(url, {
    output: fileName,
    format: format
  });
}

module.exports = { downloadVideo };
