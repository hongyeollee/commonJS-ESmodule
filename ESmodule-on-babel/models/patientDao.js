import appDataSource from "./index.js";

export const createPatient = async (
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
) => {
  let imageUrl = null;
  let imageSize = null;
  let imageTxt = null;

  if (image) {
    //console.log(`이미지 상세정보: `, image);
    imageUrl = image.path;
    imageSize = Number(image.encoding.split("")[0]);
    imageTxt = image.mimetype;
  }

  const queryRunner = appDataSource.createQueryRunner();
  queryRunner.connect();
  queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
      INSERT INTO patient(
        name,
        ssn,
        enssn,
        birthDate,
        cellPhone,
        phone,
        email
      )VALUES(
        ?,?,?,?,?,?,?
      )
      `,
      [name, ssn, enssn, birthDate, cellPhone, phone, email]
    );
    const [patientId] = await queryRunner.query(
      `SELECT
        LAST_INSERT_ID() as insertId
       FROM patient
      `
    );

    await queryRunner.query(
      `
      INSERT INTO patient_address(
        patientId,
        address1,
        address2
      )VALUES(
        ?,?,?
      )
      `,
      [patientId.insertId, address1, address2]
    );

    await queryRunner.query(
      `
      INSERT INTO patient_image(
        patientId,
        imageUrl,
        imageSize,
        imageTxt
      )VALUES(
        ?,?,?,?
      )
      `,
      [patientId.insertId, imageUrl, imageSize, imageTxt]
    );
    await queryRunner.commitTransaction();

    const result = {
      name,
      ssn,
      birthDate,
      cellPhone,
      phone,
      email,
      addresses: [{ address1, address2 }],
      images: [{ imageUrl, imageSize, imageTxt }],
    };
    return result;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error(err);
    const error = new Error("FAILED_CREATE_PATIENT");
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};
