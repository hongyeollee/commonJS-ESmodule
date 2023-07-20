import { catchAsync } from "../utils/error.js";
import * as userService from "../services/userService.js";

export const login = catchAsync(async (req, res) => {
  const user = {
    id: "idtest",
    pw: "pwtest",
  };
  const { id, pw } = req.body;

  if (!id || !pw) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  if (id !== user.id || pw !== user.pw) {
    const error = new Error("인증되지 않은 회원입니다.");
    error.statusCode = 401;
    throw error;
  }

  const getAccessToken = (await userService.login(id)).accessToken;
  const accessTokenExp = (await userService.login(id)).accessTokenExp;
  return res.status(200).json({
    code: 200,
    message: "Success",
    data: { accessToken: getAccessToken, accessTokenExp },
  });
});
