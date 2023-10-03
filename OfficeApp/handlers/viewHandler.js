const Post = require("../pkg/posts");

const multer = require("multer");
const uuid = require("uuid");
const imageId = uuid.v4();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `profile-${imageId}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  console.log('File MIME Type:', file.mimetype);
  
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log('Unsupported File Type');
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadSingleImage = upload.single("image");

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
    if (req.file) {
      const filename = req.file.filename;
      const userId = req.auth.id;

      await Post.create({
        username: req.auth.name,
        comment: req.body.comment,
        author: userId,
        time: req.body.time,
        image: filename
      });
      return res.redirect("/home");
    } else {
      return res.status(400).send("No image uploaded.");
    }
  } catch (err) {
    console.error(err);
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
    console.log(err);
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
  uploadSingleImage,
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