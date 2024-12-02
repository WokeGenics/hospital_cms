const dotenv = require("dotenv");
const dbconnect = require("./dbconnect");
const app = require("./app");

dotenv.config({
  path: "./env",
});
dbconnect().then(() => {
  app.on("error", (error) => {
    console.error("Error :", error);
    throw error;
  });
  app.listen(8000 || process.env.PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
  });
});
