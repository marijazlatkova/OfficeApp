const express = require("express");
require("./pkg/db/index");
const cookieParser = require("cookie-parser");

const { register, login } = require("./handlers/authHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//! user routes
app.post("/api/v1/auth/register", register);
app.post("/api/v1/auth/login", login);

app.listen(process.env.PORT, (err) => {
  err
  ? console.log(err)
  : console.log(`Server started successfully on port ${process.env.PORT}`);
});