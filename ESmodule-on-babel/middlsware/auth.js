import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/error.js";

const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const checkValidationToken = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NOT_EXIST_TOKEN");
    error.statusCode = 400;
    throw error;
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded.userId;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const expiredError = new Error("TOKEN_EXPIRED");
      expiredError.statusCode = 401;
      throw expiredError;
    } else if (error instanceof jwt.JsonWebTokenError) {
      const invalidTokenError = new Error("INVALID_TOKEN");
      invalidTokenError.statusCode = 401;
      throw invalidTokenError;
    } else {
      const unexpectedError = new Error("UNEXPECTED_ERROR");
      unexpectedError.statusCode = 500;
      console.error(error);
      throw unexpectedError;
    }
  }
});

export default checkValidationToken;
