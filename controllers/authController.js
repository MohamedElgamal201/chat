const { signup, login } = require("../models/userModel")

exports.getSignup = (req, res) => {
    res.render("signup", {pageTitle: "signup"})
}

exports.getLogin = (req, res) => {
    res.render("login", {pageTitle: "login"})
}

exports.postSignup = async( req, res) => {
    signup(req.body).then((msg)=>{
        console.log(msg)
        res.redirect("login")
    }).catch(err => {
        res.send(err.message)
    })
}

exports.postLogin = (req, res) => {
    login(req.body).then(data => {
        req.session.userId = data.id;
        req.session.userName = data.username;
        req.session.save(err => {
            if(err) throw new Error(err.message)
            res.redirect("choosingRoom")
        })
    }).catch(err => {
        res.send(err.message)
    })
}