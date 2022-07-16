let users = []

exports.addToRoom = (socket, io) => {
    socket.on("addToRoom", ({user, room}) => {
            users.push(user)
        socket.join(room)
        socket.emit("message",{id: 000, name: "bot", msg: `Welcome to chattoo`})
        console.log(users)
        socket.broadcast.to(room).emit("message", {id: 000, name: "bot", msg: `${user.myName} has join chat`});
        io.to(room).emit("updateOnline", users)
        socket.on("disconnect",()=>{
            const userIndex = users.findIndex(us => us.id === user.id);
            if(userIndex != -1){
                users.splice(userIndex, 1);
            }
            socket.broadcast.to(room).emit("message", {id: 000, name: "bot", msg: `${user.myName} has left the chat`});
            io.to(room).emit("updateOnline", users)
        })
    })
}
