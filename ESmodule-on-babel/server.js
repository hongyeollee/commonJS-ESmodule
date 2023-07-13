import appDataSource from "./models/index.js";
import createApp from "./app.js";
//esmodule에서 server.js에 사용하던 dotenv를 /models/index.js로 옮김.
//하지만 다른 프로젝트를 다루는 경우에는 dotenv 안에는 DB에 관련된 내용만 있는게 아니기 때문에 server.js에도 차후에는 필요할 것으로 생각됨.
//추가적으로 생각해봐야할 내용임.

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  await appDataSource
    .initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server is listen on port ${PORT}🟢`);
      });
    })
    .catch((err) => {
      console.log(`failed connect server❌`);
      appDataSource.destroy();
    });
};

startServer();
