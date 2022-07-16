const { getChoosingRoom, postChoosingRoom } = require("../controllers/choosingRoomController");
const { isAuth } = require("./verfiyAuth");

const router = require("express").Router();

router.get("/choosingRoom", isAuth, getChoosingRoom );

router.post("/choosingRoom", isAuth, postChoosingRoom);



module.exports = router