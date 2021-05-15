const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChatroomSchema = new Schema({
  chatroom_id: {
      type: String,
      required: true
  },
  chatroom_name: {
      type: String,
      required: true
  },
  dateOfEntry: {
    type: Date,
    default: Date.now()
  }
});
module.exports = Item = mongoose.model('chatrooms', ChatroomSchema);