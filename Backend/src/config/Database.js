const mongoose = require("mongoose");

const MongoDb = mongoose
  .connect("mongodb://localhost:27017/PAYTM")
  .then(() => console.log("Database Connected !!"))
  .catch((err) => {
    console.error("Database Error", err);
    process.exit(1);
  });

module.exports = MongoDb;
