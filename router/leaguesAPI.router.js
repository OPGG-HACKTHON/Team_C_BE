const express = require("express");
const updateTeamRank = require("../controller/leaguesAPI/updateTeamRank.js");
const initTeamInfo = require("../controller/leaguesAPI/initTeamInfo");
const initPlayerInfo = require("../controller/leaguesAPI/initPlayerInfo");
const addAPIKeys = require("../controller/leaguesAPI/addAPIKeys");
const wrapAsync = require("../util/wrapAsync");

const router = express.Router();

router.put("/teamRank", wrapAsync(updateTeamRank));
router.post("/teamInit", wrapAsync(initTeamInfo));
router.post("/player", wrapAsync(initPlayerInfo));
router.post("/apiKeys", wrapAsync(addAPIKeys));

module.exports = router;
