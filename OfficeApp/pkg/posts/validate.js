const { Validator } = require("node-input-validator");

const commentPost = {
  username: "required|string|minLength:3",
  comment: "required|string|minLength:3",
};

const commentPut = {
  username: "string",
  comment: "string",
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors
    };
  };
};

module.exports = {
  commentPost,
  commentPut,
  validate
};