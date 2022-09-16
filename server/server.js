const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

app.listen(process.env.PORT || 8000, () => {
  console.log(`App running on port ${process.env.PORT} ...`);
});
