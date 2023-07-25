import express from "express";
const router = express.Router();

import * as userController from "../controllers/userController.js";

router.post("/login", userController.login);
router.post("/logout", userController.logout);

export default router;
