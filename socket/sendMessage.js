const { addChat } = require("../models/chatModel")

exports.sendMessage = (socket, io) => {
    socket.on("sendMessage",(data)=>{
        console.log(55)
        addChat(data).then(result => {
            io.to(data.room).emit("message", {id: result.fromId,name: result.senderName , msg: data.message})
        })
    })
}