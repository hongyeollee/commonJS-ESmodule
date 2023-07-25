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
    return res.status(401).json({
      code: 401,
      message: "unauthorized",
      data: { message: "인증되지 않은 회원입니다." },
    });
  }

  const { accessToken, accessTokenExp, refreshToken, refreshTokenExp } =
    await userService.login(id);
  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: accessTokenExp,
    })
    .cookie("login refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExp,
    })
    .status(200)
    .json({
      code: 200,
      message: "Success",
      data: {
        accessToken,
        accessTokenExp,
        refreshToken,
        refreshTokenExp,
      },
    });
});

export const logout = catchAsync(async (req, res) => {
  return res
    .clearCookie("accessToken", {
      httpOnly: true,
    })
    .clearCookie("login refreshToken", {
      httpOnly: true,
    })
    .status(200)
    .json({ code: 200, message: "Success" });
});
