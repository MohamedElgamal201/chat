const { getSignup, getLogin, postSignup, postLogin } = require("../controllers/authController");

const router = require("express").Router();

router.get("/signup", getSignup );

router.get("/login", getLogin);

router.post("/signup", postSignup);

router.post("/login", postLogin);

module.exports = router