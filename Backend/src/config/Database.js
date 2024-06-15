const mongoose = require("mongoose");

const MongoDb = mongoose
  .connect("mongodb://localhost:27017/PAYTM")
  .then(console.log("Database Connected !!"))
  .catch(() => {
    console.error("Database Error");
  });

module.exports = MongoDb;
