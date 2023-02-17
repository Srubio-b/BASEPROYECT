//Mongo DB
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const setupDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("conectado con MongoDB Atlas"))
      .catch((error) => console.log(error));
  } catch (error) {
    return null;
  }
};

module.exports = setupDB;