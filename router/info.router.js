const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getSchedule = require("../controller/info/getSchedule.js");
const getTeamRank = require("../controller/info/getTeamRank");
const getPOGRank = require("../controller/info/getPOGRank");
const getTeamInfo = require("../controller/info/getTeamInfo");
const getCurrentGame = require("../controller/info/getCurrentGame");

const router = express.Router();

router.get("/schedule", wrapAsync(getSchedule));
router.get("/teamRank", wrapAsync(getTeamRank));
router.get("/pogRank", wrapAsync(getPOGRank));
router.get("/teamInfo", wrapAsync(getTeamInfo));
router.get("/currentGame", wrapAsync(getCurrentGame));

module.exports = router;
