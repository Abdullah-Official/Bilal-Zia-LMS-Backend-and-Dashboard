const mongoose = require("mongoose");

const classRequestsSchema = new mongoose.Schema({
      status:{
          type:String,
          default:'pending'
      },
      userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      classId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        },
});

module.exports = mongoose.model("ClassRequest", classRequestsSchema);
