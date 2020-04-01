const EXPIRES = 60 * 60 * 1000 * 24; // 24시간

function makeSignedCookie(key, value) {
  const option = {
    expires: expiryDate(),
    httpOnly: true,
    signed: true
  };

  const data = [key, value, option];
  return data;
}

function expiryDate() {
  return new Date(Date.now() + EXPIRES);
}

module.exports = { makeSignedCookie, expiryDate };
