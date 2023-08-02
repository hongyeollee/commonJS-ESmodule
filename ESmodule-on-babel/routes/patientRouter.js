import express from "express";
const router = express.Router();

import * as patientController from "../controllers/patientController.js";
import checkValidationToken from "../middlsware/auth.js";
import { createImageUploader } from "../middlsware/imageUploader.js";

const imageStoragePath =
  "/Users/hongyeol/Desktop/honyeollee/commonJS-ESmodule/ESmodule-on-babel/imageStorage";
const upload = createImageUploader(imageStoragePath);

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

router.get(
  "/:patientId",
  checkValidationToken, //
  patientController.getPatient
);

router.patch(
  "/:patientId",
  checkValidationToken,
  upload.single("file"),
  patientController.updatePatient
);

export default router;
