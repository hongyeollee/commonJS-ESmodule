import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";
import patientRouter from "./patientRouter.js";

router.use("/user", userRouter);
router.use("/patient", patientRouter);

export default router;
