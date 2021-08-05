const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const updateNickname = require("../controller/userSettingApi/updateNickname");
const updateTeamId = require("../controller/userSettingApi/updateTeamId");
router.post("/nickname", wrapAsync(updateNickname));
router.post("/teamId", wrapAsync(updateTeamId));

module.exports = router;
