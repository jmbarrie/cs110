const mongoose = require("mongoose");
const roomGenerator = require("../util/roomIdGenerator.js");
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema({
  chatroom_id: {
    type: String,
    default: roomGenerator.roomIdGenerator(),
    required: true,
  },
  chatroom_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Item = mongoose.model("chatrooms", ChatroomSchema);
