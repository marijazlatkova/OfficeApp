const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../../config.env` });

(async function() {
  try {
    const db = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.tonpgxf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
    await mongoose.connect(db);
    console.log("Successfully connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
})();