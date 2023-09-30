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

module.exports = {
  getDefaultPage,
  getRegisterPage,
  getLoginPage
};