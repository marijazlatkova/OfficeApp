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

const uploadImage = upload.single("image");

const create = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(201).send(newPost);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAll = async (req, res) => {
  try {
    const allPosts = await Post.find();
    const totalPosts = allPosts.length;
    return res.status(200).send({
      message: `${totalPosts} posts found successfully`,
      data: allPosts
    })
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    if (req.file) {
      const filename = req.file.filename;
      req.body.image = filename;
    }
    await Post.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).send("Post updated successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(204).send("Post removed successfully");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const createByUser = async (req, res) => {
  try {
    const userId = req.auth.id;
    const { username, comment } = req.body;
    const myPosts = await Post.create({
      username,
      comment,
      author: userId
    });
    return res.status(201).send(myPosts);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.auth.id;
    const myPosts = await Post.find({ author: userId });
    const totalPosts = myPosts.length;
    return res.status(200).send({
      message: `${totalPosts} posts found successfully`,
      data: myPosts
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create, 
  getAll,
  getOne,
  update,
  remove,
  createByUser,
  getByUser,
  uploadImage
};