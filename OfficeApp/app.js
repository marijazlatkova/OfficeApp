const express = require("express");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");
require("./pkg/db/index");

const { register, login, forgotPassword, resetPassword, protect } = require("./handlers/authHandler");
const { create, getAll, getOne, update, remove, getByUser, createByUser } = require("./handlers/postHandler");
const { getDefaultPage, getRegisterPage, getForgotPassword, getResetPassword, getLoginPage, getHomePage, createPosts, getMyProfile, modifyPosts, removePosts, logout } = require("./handlers/viewHandler");
const { uploadImage } = require("./handlers/storageHandler");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

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
      "/",
      "/register",
      "/login",
      "/logout",
      "/api/v1/auth/register",
      "/api/v1/auth/login",
      "/api/v1/auth/forgotPassword",
      "/api/v1/auth/resetPassword",
      "/forgotPassword",
      "/resetPassword",
    ],
  })
);

//! user routes
app.post("/api/v1/auth/register", uploadImage, register);
app.post("/api/v1/auth/login", login);
app.post("/api/v1/auth/forgotPassword", forgotPassword);
app.post("/api/v1/auth/resetPassword", resetPassword);
app.get("/forgotPassword", getForgotPassword);
app.get("/resetPassword", getResetPassword);

//! posts routes
app.post("/posts", uploadImage, create);
app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.put("/posts/:id", update);
app.delete("/posts/:id", remove);
app.post("/createByUser", createByUser);
app.get("/getByUser", getByUser);

//! view routes
app.get("/", getDefaultPage);
app.get("/register", getRegisterPage);
app.get("/login", getLoginPage);
app.get("/home", protect, getHomePage);
app.post("/createPosts", createPosts);
app.get("/myProfile", protect, getMyProfile);
app.post("/modifyPosts/:id", modifyPosts);
app.get("/removePosts/:id", removePosts);
app.get("/logout", logout);

app.listen(process.env.PORT, (err) => {
  err
  ? console.log(err)
  : console.log(`Server started successfully on port ${process.env.PORT}`);
});