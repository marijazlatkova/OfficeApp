const { Validator } = require("node-input-validator");

const MailtrapFields = {
  to: "required|string"
};

const validate = async (data, schema) => {
  let v = new Validator(data, schema);
  let e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors
    };
  }
};

module.exports = {
  MailtrapFields,
  validate
};