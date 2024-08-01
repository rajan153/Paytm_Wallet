const Account = require("../models/Account.model");
const mongoose = require("mongoose");

exports.addMoney = async (req, res) => {
  try {
    const userId = req.userId;
    const { money } = req.body;

    console.log("USERID: ", userId);

    if (!money) {
      return res.status(411).json({
        message: "Enter the balance",
      });
    }

    const response = await Account.findByIdAndUpdate(
      { userId },
      {
        $inc: {
          balance: +money,
        },
      }
    );

    if (!response) {
      return res.status(404).json({
        message: "Account is not found",
      });
    }

    return res.status(200).json({
      message: "Money is added",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while adding money to your account",
    });
  }
};

exports.checkBalance = async (req, res) => {
  try {
    const userId = req.userId;

    const response = await Account.findById({ userId });

    if (!response) {
      return res.status(400).json({
        message: "User is not found",
      });
    }

    return res.status(200).json({
      balance: response.balance,
      message: "Balance Checked",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while checking balance",
    });
  }
};

exports.transferBalance = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const myAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!myAccount || myAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    return res.status(404).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: +amount } }
  ).session(session);

  await session.commitTransaction();

  res.status(200).json({
    message: "Transaction Successfull",
  });
};
