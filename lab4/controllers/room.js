// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');
const Chatroom = require('../models/Chatrooms');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    let roomName = request.params.roomName;
    Chatroom.find({chatroom_name: roomName}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            let roomId;
            // If a chatroom with that name exists get it, else create one
            if (docs.length > 0) {
                roomId = docs[0].chatroom_id;
            } else {
                roomId = roomGenerator.roomIdGenerator()
                const newChatroom = new Chatroom ({
                    chatroom_id: roomId,
                    chatroom_name: roomName
                });
            
                newChatroom
                    .save()
                    .then(item => console.log(item))
                    .catch(err => console.log(err));
            }

            response.render('room', {
                title: 'chatroom', 
                roomName,
                roomId 
            })
        }
    })
}

module.exports = {
    getRoom
};