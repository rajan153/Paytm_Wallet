const User = require("../models/User.model");
const { z } = require("zod");
const { JWT_SECRET } = require("../config/Jsonwebtoken");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account.model");

const signUpValidation = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const loginValidation = z.object({
  username: z.string().email(),
  password: z.string(),
});

exports.Signup = async (req, res) => {
  const { success } = signUpValidation.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Need all fields",
    });
  }

  const existsUser = await User.findOne({
    username: req.body.username,
  });

  if (existsUser) {
    return res.status(411).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 0,
  });

  res.status(200).json({
    message: "Sign up Successfull !",
  });
};

exports.login = async (req, res) => {
  const { success } = loginValidation.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Fill the all fields",
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(411).json({
      message: "User not exists",
    });
  }

  const correctPassword = user.isPasswordCorrect(password);

  if (!correctPassword) {
    return res.status(400).json({
      message: "Password incorrect",
    });
  }

  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  const userData = await User.findById(userId).select("-password");

  return res.status(200).json({
    message: "Logged In !",
    data: userData,
    token,
  });
};
