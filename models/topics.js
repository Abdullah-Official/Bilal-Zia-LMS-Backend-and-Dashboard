const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topicNumber: {
    type: String,
    required: true,
  },
  topicName: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  topicDescription:{
    type: String,
    required: true,
  },
  chapterId: {
    type: String,
    required: false,
  },
  quiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  ],
  assignment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Topic", topicSchema);
