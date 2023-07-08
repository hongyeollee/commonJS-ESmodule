import { createConnection } from "typeorm";

let connection;

const initialize = async () => {
  connection = await createConnection({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

const destroy = async () => {
  // 연결을 닫는 로직을 추가해야 합니다.
  if (connection) await connection.close();
};

export default { initialize, destroy };
