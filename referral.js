const users = {};

function addUser(userId, referrerId = null) {
  if (!users[userId]) {
    users[userId] = {
      coins: 0,
      referredBy: referrerId || null
    };

    if (referrerId && users[referrerId]) {
      users[referrerId].coins += 10;
    }
  }
}

function getUser(userId) {
  return users[userId] || { coins: 0 };
}

module.exports = { addUser, getUser };
