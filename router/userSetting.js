const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const updateNickname = require("../controller/userSettingApi/updateNickname");
const updateTeamId = require("../controller/userSettingApi/updateTeamId");
router.put("/nickname", wrapAsync(updateNickname));
router.put("/teamId", wrapAsync(updateTeamId));

module.exports = router;
