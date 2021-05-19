// import dependencies
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const Chatrooms = require('./models/Chatrooms')
const roomGenerator = require('./util/roomIdGenerator.js');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code
const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Create controller handlers to handle requests at each endpoint
app.post("/create", function(req, res) { 
  const newRoom = new Chatrooms({
    chatroom_name: req.body.roomName,
    chatroom_id: roomGenerator.roomIdGenerator()
  })
  newRoom.save()
    .then(item => {
      console.log("room added")
      console.log(item)
    })
    .catch(e => console.log(e))
})
app.get("/getRoom", homeHandler.getRoom)
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));