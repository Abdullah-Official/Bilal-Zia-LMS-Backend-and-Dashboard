const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Bilal Zia",
  },
  class: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: 60*60*24*2, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
