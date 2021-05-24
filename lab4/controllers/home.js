// Controller handler to handle functionality in home page
const Chatrooms = require("../models/Chatrooms");
// Example for handle a get request at '/' endpoint.
fakeDB = () => {
  return [
    {
      chatroom_name: "room1",
    },
    {
      chatroom_name: "room2",
    },
  ];
};

function getHome(request, response) {
  // do any work you need to do, then
  // response.render('home', {title: 'home'});

  // TODO: Get chatroom names from mongoose - probably a .find()
  Chatrooms.find()
    .lean()
    .then((items) => {
      response.render("home", {
        title: "home",
        rooms: items,
        isAvailable: true,
      });
    });
}
function getRoom(req, res) {
  Chatrooms.find()
    .lean()
    .then((items) => {
      res.json(items);
    });
}

// function createRoom

module.exports = {
  getHome,
  getRoom,
};
