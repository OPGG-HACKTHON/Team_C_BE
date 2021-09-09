const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getSchedule = require("../controller/info/getSchedule.js");
const getTeamRank = require("../controller/info/getTeamRank");
const getPOGRank = require("../controller/info/getPOGRank");
const getTeamInfo = require("../controller/info/getTeamInfo");
const getCurrentGame = require("../controller/info/getCurrentGame");
const getGameById = require("../controller/info/getGameById");
const getTeamPlayer = require("../controller/info/getTeamPlayer");

const router = express.Router();

router.get("/schedule", wrapAsync(getSchedule));
router.get("/teamRank", wrapAsync(getTeamRank));
router.get("/pogRank", wrapAsync(getPOGRank));
router.get("/teamInfo", wrapAsync(getTeamInfo));
router.get("/currentGame", wrapAsync(getCurrentGame));
router.get("/gameResult", wrapAsync(getGameById));
router.get("/teamPlayer", wrapAsync(getTeamPlayer));

module.exports = router;
