const { getChat } = require("../models/chatModel");

const router = require("express").Router();

router.get("/getchat/:room", (req, res)=>{
    getChat(req.params.room).then(data=>{
        res.json(data)
    })
})


module.exports = router