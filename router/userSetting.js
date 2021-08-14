const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const updateNickname = require("../controller/userSettingApi/updateNickname");
const updateTeamId = require("../controller/userSettingApi/updateTeamId");
const { checkTokens } = require("../util/checkTokens");
router.put("/nickname", wrapAsync(checkTokens), wrapAsync(updateNickname));
router.put("/teamId", wrapAsync(checkTokens), wrapAsync(updateTeamId));

module.exports = router;
