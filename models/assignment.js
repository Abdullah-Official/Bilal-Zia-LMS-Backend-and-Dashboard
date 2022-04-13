const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  incorrect_answer: 
    {
      type: Array,
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

module.exports = mongoose.model("Assignment", assignmentSchema);
