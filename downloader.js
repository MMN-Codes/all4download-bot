const axios = require('axios');

async function getDownloadLink(url) {
  try {
    const res = await axios.get(
      `https://api.savetube.me/info?url=${encodeURIComponent(url)}`
    );

    const data = res.data;

    if (!data || !data.data || !data.data.downloads) return null;

    // best quality pick
    const video = data.data.downloads.find(v => v.format === 'mp4');

    return video ? video.url : null;

  } catch (err) {
    console.log(err.message);
    return null;
  }
}

module.exports = { getDownloadLink };
