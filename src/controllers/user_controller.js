const response = require("../helpers/response");
const bcrypt = require("bcrypt");

const { registerUserModel } = require("../models/user_model");
const { getUserModel } = require("../models/user_model");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserAlreadyExist = await getUserModel(username);

    if (isUserAlreadyExist.length) {
      return response(res, "User already exist", 400, false, null);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await registerUserModel({
      username: username,
      password: hashedPassword,
    });
    return response(res, "Success", 200, true, result);
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

module.exports = { registerUser };
