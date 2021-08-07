const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getSchedule = require("../controller/info/getSchedule.js");
const getTeamRank = require("../controller/info/getTeamRank");
const getPOGRank = require("../controller/info/getPOGRank");

const router = express.Router();

router.get("/schedule", wrapAsync(getSchedule));
router.get("/teamRank", wrapAsync(getTeamRank));
router.get("/pogRank", wrapAsync(getPOGRank));

module.exports = router;
