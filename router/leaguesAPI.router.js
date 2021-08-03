const express = require("express");
const updateTeamRank = require("../controller/leaguesApi/updateTeamRank.js");
const initTeamInfo = require("../controller/leaguesApi/initTeamInfo");
const initPlayerInfo = require("../controller/leaguesApi/initPlayerInfo");
const addAPIKeys = require("../controller/leaguesApi/addAPIKeys");
const wrapAsync = require("../util/wrapAsync");

const router = express.Router();

router.put("/teamRank", wrapAsync(updateTeamRank));
router.post("/teamInit", wrapAsync(initTeamInfo));
router.post("/player", wrapAsync(initPlayerInfo));
router.post("/apiKeys", wrapAsync(addAPIKeys));

module.exports = router;
