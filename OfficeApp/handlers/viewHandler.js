const Post = require("../pkg/posts");

const getDefaultPage = async (req, res) => {
  try {
    return res.render("default-page", {
      title: "Welcome to the Office Chat App"
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const getRegisterPage = async (req, res) => {
  try {
    return res.render("register", {
      title: "Register",
      subtitle: "The Office Chat App"
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getLoginPage = async (req, res) => {
  try {
    return res.render("login", {
      title: "The Office Chat App",
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const getForgotPassword = async (req, res) => {
  try {
    return res.render("forgot-password", {
      title: "The Office Chat App",
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const getResetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    return res.render("reset-password", {
      title: "The Office Chat App",
      token
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const getHomePage = async (req, res) => {
  try {
    const username = req.auth.name;
    const image = req.auth.image;
    const posts = await Post.find();
    return res.render("home", {
      title: "The Office Chat App",
      subtitle: "Welcome to news feed",
      username,
      image,
      posts
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const createPosts = async (req, res) => {
  try {
    const userId = req.auth.id;
    await Post.create({
      username: req.auth.name,
      comment: req.body.comment,
      author: userId,
      time: req.body.time,
    });
    return res.redirect("/home");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getMyProfile = async (req, res) => {
  try {
    const username = req.auth.name;
    const userId = req.auth.id;
    const image = req.auth.image;
    const posts = await Post.find({ author: userId });
    return res.render("my-profile", {
      title: "My Profile",
      subtitle: "My statuses",
      username,
      image,
      posts
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const modifyPosts = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/myProfile");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const removePosts = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.redirect("/myProfile");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const logout = (req, res) => {
  try {
    req.logout;
    return res.redirect("/")
  } catch (err) {
    return res.status(500).send("Error logging out", err);
  }
};

module.exports = {
  getDefaultPage,
  getRegisterPage,
  getLoginPage,
  getForgotPassword,
  getResetPassword,
  getHomePage,
  createPosts,
  getMyProfile,
  modifyPosts,
  removePosts,
  logout
};