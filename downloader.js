const axios = require('axios');

async function getDownloadLink(url) {
  try {
    const res = await axios.get(
      `https://api.vevioz.com/api/button/mp4?url=${encodeURIComponent(url)}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { getDownloadLink };
