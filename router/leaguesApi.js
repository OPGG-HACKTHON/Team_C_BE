const express = require("express");
const updateTeamRank = require("../controller/leaguesApi/updateTeamRank.js");
const wrapAsync = require("../util/wrapAsync");

const router = express.Router();

router.put("/teamRank", wrapAsync(updateTeamRank));

module.exports = router;
