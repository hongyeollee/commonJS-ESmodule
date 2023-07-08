import dotenv from "dotenv";
dotenv.config();
import database from "./models/index.js";
import createApp from "./app.js";

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  try {
    await database.initialize();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}🟢`);
    });
  } catch (err) {
    console.log(`Failed to start the server❌`);
    console.error(err);
    database.destroy();
  }
};

startServer();
