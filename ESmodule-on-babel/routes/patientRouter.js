import express from "express";
const router = express.Router();

import * as patientController from "../controllers/patientController.js";
import checkValidationToken from "../middlsware/auth.js";
import { upload } from "../middlsware/imageUploader.js";

router.post(
  "/",
  checkValidationToken,
  upload.single("file"),
  patientController.createPatient
);

router.delete(
  "/:patientId",
  checkValidationToken,
  patientController.deletePatient
);

export default router;
