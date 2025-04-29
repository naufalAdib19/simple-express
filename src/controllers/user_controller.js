const response = require("../helpers/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../helpers/redis_client");
const { sendOTPQueue } = require("../helpers/bullmq");

const { registerUserModel } = require("../models/user_model");
const { getUserModel, linkUserToEmailModel } = require("../models/user_model");

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

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUserModel(username);
    if (!user.length) {
      return response(res, "User not found", 400, false, null);
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return response(res, "Invalid password", 400, false, null);
    }

    const token = jwt.sign(
      { username: user[0].username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return response(res, "Success", 200, true, { token });
  } catch (err) {
    return response(res, "Error", 500, false, err);
  }
};

const sendOTP = async (req) => {
  const { email } = req.body;
  const user = req.user.username;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const storedDateToRedis = {
    email: email,
    otp: otp,
  };

  // Set OTP in Redis
  await client.setEx(`otp:${user}`, 180, JSON.stringify(storedDateToRedis));

  // Add job to send-otp queue
  sendOTPQueue.add("send-otp", { email: email, otp: otp });
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const user = req.user.username;
  const redisData = await client.get(`otp:${user}`);

  const { email, otp: otpFromRedis } = JSON.parse(redisData);

  try {
    if (otp !== otpFromRedis) {
      return response(res, "Invalid OTP", 400, false, null);
    }
    const result = await linkUserToEmailModel({
      email: email,
      username: user,
    });
    return response(res, "Success", 200, true, result);
  } catch (err) {
    console.log(err);
    return response(res, "Error", 500, false, err);
  }
};

module.exports = { registerUser, loginUser, sendOTP, verifyOTP };
