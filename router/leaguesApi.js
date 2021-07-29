const express = require("express");
const updateTeamRank = require("../controller/leaguesApi/updateTeamRank.js");

const router = express.Router();

router.put("/teamRank", updateTeamRank);

module.exports = router;
