import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/error.js";
//import * as userController from "../controllers/userController.js";

const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const checkValidationToken = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NOT_EXIST_TOKEN");
    error.statusCode = 400;
    throw error;
  }

  const decoded = jwt.verify(accessToken, secretKey);
  req.user = decoded.userId;
  return next();
});

export default checkValidationToken;
