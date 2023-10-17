const Post = require("../pkg/posts");

const create = async (req, res) => {
  try {
    if (req.file) {
      const filename = req.file.filename;
      req.body.image = filename;
    }
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
    await Post.updateMany({ author: userId }, { $unset: { image: "" } });
    const myPosts = await Post.create({
      username,
      comment,
      author: userId,
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
  getByUser
};