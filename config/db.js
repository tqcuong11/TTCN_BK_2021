require("dotenv").config()
const mongoose = require("mongoose")
async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.db_id}:${process.env.db_password}@cluster0.v8obn.mongodb.net/ElectricStore?retryWrites=true&w=majority`,
    ),
      console.log("DB Connected")
  } catch (error) {
    console.log("Error")
  }
}

module.exports = { connect }
