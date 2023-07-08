require("dotenv").config();
const { appDataSource } = require("./models/index");
const { createApp } = require("./app.js");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  await appDataSource
    .initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}🟢`);
      });
    })
    .catch((err) => {
      console.log(`Failed to start the server❌`);
      appDataSource.destroy();
    });
};

startServer();
