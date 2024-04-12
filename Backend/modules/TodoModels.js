const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ToDo", toDoSchema);
