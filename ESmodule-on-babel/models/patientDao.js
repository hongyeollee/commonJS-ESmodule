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
        email,
        createdAt
      )VALUES(
        ?,?,?,?,?,?,?,DATE_FORMAT(NOW(), '%Y%m%d%H%i%s')
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
        address2,
        createdAt
      )VALUES(
        ?,?,?,DATE_FORMAT(NOW(), '%Y%m%d%H%i%s')
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
        imageTxt,
        createdAt
      )VALUES(
        ?,?,?,?,DATE_FORMAT(NOW(), '%Y%m%d%H%i%s')
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

export const deletePatient = async (patientId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `
      DELETE FROM patient_image
      WHERE patientId=?;
      `,
      [patientId]
    );

    await queryRunner.query(
      `
      DELETE FROM patient_address
      WHERE patientId=?;
      `,
      [patientId]
    );

    await queryRunner.query(
      `
      DELETE FROM patient
      WHERE patientId=?;
      `,
      [patientId]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error(err);
    const error = new Error("FAILED_DELETE_PATIENT");
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

export const getPatientById = async (patientId) => {
  const data = await appDataSource.query(
    `
    SELECT
      imageUrl
    FROM
      patient_image
    where
      patientId=?
    `,
    [patientId]
  );
  return data;
};

export const getPatient = async (patientId) => {
  const result = await appDataSource.query(
    `
    SELECT
      p.patientId AS patientId,
      p.name AS name,
      p.ssn AS ssn,
      p.enssn AS encssn,
      p.birthDate AS birthDate,
      p.cellPhone AS cellPhone,
      p.phone AS phone,
      ANY_VALUE(pi.imageUrl) AS imageUrl,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'address1', pa.address1,
          'address2', pa.address2,
          'createdAt', pa.createdAt
        )
      ) AS addresses,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'imageUrl', pi.imageUrl,
          'imageSize', pi.imageSize,
          'imageTxt', pi.imageTxt,
          'createdAt', pi.createdAt
        )
      ) AS images,
      p.createdAt AS createdAt
    FROM
      patient p
    JOIN
      patient_address pa ON p.patientId = pa.patientId
    JOIN
      patient_image pi ON p.patientId = pi.patientId
    WHERE
      p.patientId =?
    GROUP BY
      p.patientId
    `,
    [patientId]
  );
  return result;
};
