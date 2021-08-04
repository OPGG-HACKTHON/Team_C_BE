const express = require("express");
const updateTeamRank = require("../controller/leaguesApi/updateTeamRank.js");
const initTeamInfo = require("../controller/leaguesApi/initTeamInfo");
const initPlayerInfo = require("../controller/leaguesApi/initPlayerInfo");
const addAPIKeys = require("../controller/leaguesApi/addAPIKeys");
const initSchedule = require("../controller/leaguesApi/initSchedule");
const updateSchedule = require("../controller/leaguesApi/updateSchedule");
const wrapAsync = require("../util/wrapAsync");

const router = express.Router();

router.put("/teamRank", wrapAsync(updateTeamRank));
router.post("/teamInit", wrapAsync(initTeamInfo));
router.post("/player", wrapAsync(initPlayerInfo));
router.post("/apiKeys", wrapAsync(addAPIKeys));
router.post("/schedule", wrapAsync(initSchedule));
router.put("/schedule", wrapAsync(updateSchedule));

module.exports = router;
