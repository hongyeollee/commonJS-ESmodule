import * as crypto from "crypto";
import * as patientDao from "../models/patientDao.js";

export const createPatient = async (
  name,
  ssn,
  birthDate,
  cellPhone,
  phone,
  email,
  address1,
  address2,
  image
) => {
  const enssn = await encryptSsn(ssn);

  return await patientDao.createPatient(
    name,
    ssn,
    enssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2,
    image
  );
};

export const deletePatient = async (patientId) => {
  return await patientDao.deletePatient(patientId);
};

export const getPatientById = async (patientId) => {
  return await patientDao.getPatientById(patientId);
};

const encryptSsn = async (ssn) => {
  const cipher = crypto.createCipheriv(
    process.env.CRYPTO_ALGORITHM,
    process.env.CRYPTO_KEY,
    process.env.CRYPTO_IV
  );

  let enssn = cipher.update(ssn, "utf8", "base64");
  return (enssn += cipher.final("base64"));
};
