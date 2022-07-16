require("dotenv").config();
const express = require("express");
const path = require("path");
const http = require("http");
const session = require("express-session");
const MongoDBStore = require('express-mongodb-session')(session);
const socketIO = require('socket.io');

const app = express();
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'mySessions',
  expires: 1000 * 60 * 60 * 24
});

const authRouter = require("./routes/authRouter");
const choosingRoomRouter = require("./routes/choosingRoomRouter");
const chatRouter = require("./routes/chatRouter");
const { addToRoom } = require("./socket/addToRoom");
const { sendMessage } = require("./socket/sendMessage");

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "assets")))
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET_PASS_SESS,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
  }))

app.use("/", authRouter);
app.use("/", choosingRoomRouter);
app.use("/", chatRouter);

io.on("connection",(socket)=>{
    socket.emit("joinRoom")
    addToRoom(socket, io)
    sendMessage(socket, io)

});

const PORT = process.env.PORT || 3000 ;

server.listen(PORT, ()=>{
    console.log("server is running in port " + PORT)
})