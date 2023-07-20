import jwt from "jsonwebtoken";

export const login = (id) => {
  return getAccessToken(id);
};

export const getAccessToken = async (id) => {
  const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
  const time = new Date().getTime() / 1000 + 60 * 60 * 9;
  const currentTime = Math.floor(time);
  const expireTime = currentTime * 60 * 60; //accessToken 만료시간 : 발급기준 1시간

  const payload = {
    userId: id,
    iss: "accessToken test",
    iat: currentTime,
    exp: expireTime,
  };

  const accessToken = jwt.sign(payload, secretKey);
  const accessTokenExp = payload.exp.toString();
  return { accessToken, accessTokenExp };
};
