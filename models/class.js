const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: false,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Class", classSchema);
