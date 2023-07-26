import express from "express";
const router = express.Router();

import * as patientController from "../controllers/patientController.js";

router.post("/", patientController.createPatient);

export default router;
