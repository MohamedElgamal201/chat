const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    fromId: String,
    senderName: String,
    room: String,
    message: String,
}, {timestamps: true});


const Chat = mongoose.model("chat", chatSchema);

exports.addChat = async (data) =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        const newChat = new Chat(data);
        await newChat.save();
        mongoose.disconnect();
        return newChat
    }catch(err){
        mongoose.disconnect();
        throw new Error(err.message)
    }
}

exports.getChat = async (room) =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        const chat = await Chat.find({room: room}).sort({"createdAt": 1});
        mongoose.disconnect();
        return chat
    }catch(err){
        mongoose.disconnect();
        throw new Error(err.message)
    }
}