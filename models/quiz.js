const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  options: 
    {
      type: Array,
      // required: true,
      default: ["A", "B", "C", "D"]
    },
  solution: {
    type: String,
    required: true,
  },
  topicId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
