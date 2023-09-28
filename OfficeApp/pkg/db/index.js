const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../../config.env` });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async function () {
  try {
    await mongoose.connect(db);
    console.log("Successfully connected to DataBase");
  } catch (err) {
    console.log("Error connecting to DataBase");
  }
})();