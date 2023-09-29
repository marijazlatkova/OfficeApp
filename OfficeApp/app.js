const express = require("express");
const jwt = require("express-jwt");
require("./pkg/db/index");
const cookieParser = require("cookie-parser");

const { register, login } = require("./handlers/authHandler");
const { create, getAll, getOne, update, remove, getByUser, createByUser } = require("./handlers/postHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(jwt
  .expressjwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    if (req.cookies.jwt) {
      return req.cookies.jwt;
    }
    return null;
  },
}).unless({
    path: [
      "/api/v1/auth/register",
      "/api/v1/auth/login"
    ],
  })
);

//! user routes
app.post("/api/v1/auth/register", register);
app.post("/api/v1/auth/login", login);

//! posts routes
app.post("/posts", create);
app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.patch("/posts/:id", update);
app.delete("/posts/:id", remove);
app.post("/createByUser", createByUser);
app.get("/getByUser", getByUser);


app.listen(process.env.PORT, (err) => {
  err
  ? console.log(err)
  : console.log(`Server started successfully on port ${process.env.PORT}`);
});