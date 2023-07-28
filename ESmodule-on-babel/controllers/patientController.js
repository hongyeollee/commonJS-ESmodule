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
