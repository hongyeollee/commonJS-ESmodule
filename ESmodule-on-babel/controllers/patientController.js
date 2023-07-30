import fs from "fs";

import { deleteFile } from "../middlsware/imageUploader.js";
import * as patientService from "../services/patientService.js";
import { catchAsync } from "../utils/error.js";

export const createPatient = catchAsync(async (req, res) => {
  const image = req.file;

  const { name, ssn, birthDate, cellPhone, phone, email, address1, address2 } =
    req.body;

  if (!name || !ssn || !birthDate || !cellPhone || !address1) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  const data = await patientService.createPatient(
    name,
    ssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2,
    image
  );

  return res.status(200).json({ code: 200, message: "Success", data });
});

export const deletePatient = catchAsync(async (req, res) => {
  const { patientId } = req.params;
  const [getPatientById] = await patientService.getPatientById(patientId);

  if (!patientId) {
    const error = new Error("NOT_EXIST_PATIENT");
    error.statusCode = 400;
    throw error;
  }
  const filename = getPatientById.imageUrl;
  if (filename) {
    fs.access(filename, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        deleteFile(filename);
      }
    });
  }

  await patientService.deletePatient(patientId, filename);

  return res.status(200).json({ code: 200, message: "Success" });
});

export const getPatient = catchAsync(async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    const error = new Error("NOT_EXIST_PATIENT");
    error.statusCode = 400;
    throw error;
  }

  const data = await patientService.getPatient(patientId);

  return res.status(200).json({ code: 200, message: "Success", data });
});
