import jwt from "jsonwebtoken";

const time = new Date().getTime() / 1000 + 60 * 60 * 9;
const currentTime = Math.floor(time);

export const login = async (id) => {
  const accessToken = await getAccessToken(id);
  const refreshToken = await setRefreshToken(id);

  return {
    accessToken: accessToken.accessToken,
    accessTokenExp: accessToken.accessTokenExp,
    refreshToken: refreshToken.setRefreshToken,
    refreshTokenExp: refreshToken.refreshTokenExp,
  };
};

export const getAccessToken = async (id) => {
  const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
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

export const setRefreshToken = (id) => {
  const secretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KET;
  const expireTime = currentTime * 60 * 60 * 24 * 7; //refreshToken 만료시간 : 발급기준 7일

  const payload = {
    userId: id,
    iss: "refreshToken test",
    exp: expireTime,
  };
  const setRefreshToken = jwt.sign(payload, secretKey);
  const refreshTokenExp = payload.exp.toString();
  return { setRefreshToken, refreshTokenExp };
};
