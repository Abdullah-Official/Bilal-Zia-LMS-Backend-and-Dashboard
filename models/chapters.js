const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  chapterNumber: {
    type: String,
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: false,
  },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Chapter", chapterSchema);
