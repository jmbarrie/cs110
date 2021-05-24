const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    default: new Date(),
    required: true,
  },
  text_body: {
    type: String,
    required: true,
  },
  chatroom_name: {
    type: String,
    required: true,
  },
});
module.exports = Item = mongoose.model("messages", MessageSchema);
