const express = require("express");
const updateTeamRank = require("../controller/leaguesAPI/updateTeamRank.js");
const initTeamInfo = require("../controller/leaguesAPI/initTeamInfo");
const wrapAsync = require("../util/wrapAsync");

const router = express.Router();

router.put("/teamRank", wrapAsync(updateTeamRank));
router.post("/teamInit", wrapAsync(initTeamInfo));

module.exports = router;
