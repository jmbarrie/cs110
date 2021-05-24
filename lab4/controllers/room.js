// Controller handler to handle functionality in room page

const roomGenerator = require("../util/roomIdGenerator.js");
const Messages = require("../models/Messages");

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
  let roomName = request.params.roomName;
  // Chatroom.find({chatroom_name: roomName}, function (err, docs) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         let roomId;
  //         // If a chatroom with that name exists get it, else create one
  //         if (docs.length > 0) {
  //             roomId = docs[0].chatroom_id;
  //         } else {
  //             roomId = roomGenerator.roomIdGenerator()
  //             const newChatroom = new Chatroom ({
  //                 chatroom_id: roomId,
  //                 chatroom_name: roomName
  //             });

  //             newChatroom
  //                 .save()
  //                 .then(item => console.log(item))
  //                 .catch(err => console.log(err));
  //         }

  // TODO: Get the messages and submit to room.hbs
  Messages.find({ chatroom_name: roomName })
    .lean()
    .then((items) => {
      response.render("room", {
        title: "chatroom",
        roomName,
        messages: items,
        isAvailable: true,
        // newRoomId: roomId
      });
    });
}
//     })
// }

function getMessages(request, response) {
  Messages.find()
    .sort({ created_at: -1 })
    .lean()
    .then((items) => {
      response.json(items);
    });
}
module.exports = {
  getRoom,
  getMessages,
};
