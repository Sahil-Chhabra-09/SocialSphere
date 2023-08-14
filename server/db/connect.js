const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("CONNECTED TO MONGODB");
    })
    .catch((error) => {
      console.log({
        msg: "Error occured while connecting to mongodb",
        error: error,
      });
    });
};

module.exports = connectDB;
