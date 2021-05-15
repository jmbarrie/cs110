// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');
const Chatroom = require('../models/Chatrooms');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response){
    // TODO: Validate for created rooms
    // TODO: Room has already been created

    // Room has not been created yet
    let roomName = request.params.roomName;
    // Chatroom.exists({chatroom_name: roomName}, function (err, doc) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Result: ', doc);
    //         boolCheck = doc;
    //     }
    // })
    Chatroom.exists({chatroom_name: roomName}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            // TODO: Figure out how to access data from within a mongoose call
            let roomId = '';
            if (doc) {
                // Chatroom.find({chatroom_name: roomName}, function (err, doc) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         roomId = doc[0].chatroom_id;
                //         console.log(roomId);
                //     }
                // });
                // roomId = docs.chatroom_id;
                doc = Chatroom.find({chatroom_name: roomName}).exec()
                // console.log(doc[0].chatroom_id)
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