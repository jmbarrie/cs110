const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
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
