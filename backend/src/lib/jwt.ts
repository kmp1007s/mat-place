const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
import { makeSignedCookie } from "lib/cookie";

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: "1d"
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

async function jwtMiddleWare(req, res, next) {
  const token = req.signedCookies.access_token;
  if (!token) return next();

  try {
    const decoded: any = await decodeToken(token);

    // 토큰 만료시간이 12시간 남은 경우
    if (Date.now() - decoded.iat > 60 * 60 * 1000 * 12) {
      const { _id } = decoded;
      const freshToken = await generateToken({ _id });

      res.cookie(...makeSignedCookie("access_token", freshToken));
    }

    req.user = decoded;
  } catch (e) {
    res.clearCookie("access_token");
    return next(e); // 에러 처리 미들웨어 호출
  }

  return next();
}

export { generateToken, decodeToken, jwtMiddleWare };
