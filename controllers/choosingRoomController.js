

exports.getChoosingRoom = (req, res) => {
    res.render("choosingRoom", {pageTitle: "choosingRoom"});
}

exports.postChoosingRoom = (req, res) => {
    if(req.body.room){
        res.render("home", {pageTitle: "home",roomName: req.body.room, user: {id: req.session.userId, name: req.session.userName}})
    }else{
        res.send("room cannot be empty")
    }
}