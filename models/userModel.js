require("dotenv").config()

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model("user", userSchema);

exports.signup = async (data) => {
    try{

        await mongoose.connect(process.env.DB_URL);

        const checkUser = await User.find({email: data.email});

        if(checkUser.length !== 0) throw new Error("this user is aleardy exist");
        if(data.password.length <= 6) throw new Error("password is to short");
        if(data.username.length <= 1) throw new Error("user can not be empty or one character");

        const newUser = new User(data);

        newUser.password = await bcrypt.hash(newUser.password, 10);

        await newUser.save();

        mongoose.disconnect();

        return 

    }catch(err){
        mongoose.disconnect();
        throw new Error(err.message);
    }
}

exports.login = async (data) => {
    try{
        await mongoose.connect(process.env.DB_URL);

        const checkUser = await User.find({email: data.email});

        if(checkUser.length === 0) throw new Error("there is now use with that name");

        const isMatch = await bcrypt.compare(data.password,checkUser[0].password);
        if(!isMatch) throw new Error("pasword is wrong");

        mongoose.disconnect();

        return {id: checkUser[0]._id, username: checkUser[0].username}

    }catch(err){
        mongoose.disconnect()
        throw new Error(err.message)
    }
}