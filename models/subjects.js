const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: false,
  },
  classId: {
    type: String,
    required: false,
  },
  chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Subject", subjectSchema);
