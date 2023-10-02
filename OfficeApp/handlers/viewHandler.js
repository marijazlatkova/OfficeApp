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

const getLoginPage= async (req, res) => {
  try {
    return res.render("login", {
      title: "The Office Chat App",
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const getHomePage = async (req, res) => {
  try {
    const username = req.auth.name;
    const posts = await Post.find();
    return res.render("home", {
      title: "The Office Chat App",
      subtitle: "Welcome to news feed",
      username,
      posts
    });
  } catch (err) {
    return res.status(500).send(err)
  }
};

const createPosts = async (req, res) => {
  try {
    await Post.create(req.body);
    return res.redirect("/home");
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getMyProfile = async (req, res) => {
  try {
    const username = req.auth.name;
    const userId = req.auth.id;
    const posts = await Post.find({ author: userId });
    return res.render("my-profile", {
      title: "My profile",
      subtitle: "My statuses",
      username,
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
    res.redirect("/login")
  } catch (err) {
    res.status(500).send("Error logging out", err);
  }
};

module.exports = {
  getDefaultPage,
  getRegisterPage,
  getLoginPage,
  getHomePage,
  createPosts,
  getMyProfile,
  modifyPosts,
  removePosts,
  logout
};