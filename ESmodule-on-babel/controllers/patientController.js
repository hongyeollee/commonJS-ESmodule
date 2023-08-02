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
    deleteFile(image.path);
    throw error;
  }
  try {
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
  } catch (err) {
    deleteFile(image.path);
    console.error(err);
    throw err;
  }
});

export const deletePatient = catchAsync(async (req, res) => {
  const { patientId } = req.params;
  const existPatientInfo = await patientService.getIdByPatientId(patientId);

  if (!existPatientInfo) {
    const error = new Error("NOT_EXIST_PATIENT");
    error.statusCode = 400;
    throw error;
  }
  deletePatientImage(patientId);
  await patientService.deletePatient(patientId);

  return res.status(200).json({ code: 200, message: "Success" });
});

export const getPatient = catchAsync(async (req, res) => {
  const { patientId } = req.params;
  const existPatientInfo = await patientService.getIdByPatientId(patientId);

  if (!existPatientInfo) {
    const error = new Error("NOT_EXIST_PATIENT");
    error.statusCode = 400;
    throw error;
  }

  const data = await patientService.getPatient(patientId);

  return res.status(200).json({ code: 200, message: "Success", data });
});

export const updatePatient = catchAsync(async (req, res) => {
  const image = req.file;
  const { patientId } = req.params;
  const { name, ssn, birthDate, cellPhone, phone, email, address1, address2 } =
    req.body;
  const existPatientInfo = await patientService.getIdByPatientId(patientId);

  if (!existPatientInfo) {
    const error = new Error("NOT_EXIST_PATIENT");
    error.statusCode = 400;
    if (image) {
      deleteFile(image.path);
    }
    throw error;
  }
  if (image) deletePatientImage(patientId);
  try {
    const data = await patientService.updatePatient(
      name,
      ssn,
      birthDate,
      cellPhone,
      phone,
      email,
      address1,
      address2,
      image,
      patientId
    );

    return res.status(200).json({ code: 200, message: "Success", data });
  } catch (err) {
    deleteFile(image.path);
    console.error(err);
    throw err;
  }
});

const deletePatientImage = async (patientId) => {
  const [getImageInfoByPatientId] =
    await patientService.getImageInfoByPatientId(patientId);

  const filename = await getImageInfoByPatientId.imageUrl;
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
};
