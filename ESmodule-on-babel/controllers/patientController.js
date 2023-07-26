import * as patientService from "../services/patientService.js";
import { catchAsync } from "../utils/error.js";

export const createPatient = catchAsync(async (req, res) => {
  //image uploader에 대한 기능(미들웨어) 추가할때 api문서보고 추가 기능 구현필요
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
    address2
  );

  return res.status(201).json({ code: 200, message: "Success", data });
});
