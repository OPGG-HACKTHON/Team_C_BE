const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const { checkTokens } = require("../util/checkTokens");

const updateNickname = require("../controller/userSettingApi/updateNickname");
const updateTeamId = require("../controller/userSettingApi/updateTeamId");
const savePreference = require("../controller/userSettingApi/savePreference");
const getUserPreference = require("../controller/userSettingApi/getUserPreference");

const router = express.Router();

router.put("/nickname", wrapAsync(checkTokens), wrapAsync(updateNickname));
router.put("/teamId", wrapAsync(checkTokens), wrapAsync(updateTeamId));
router.post("/preference", wrapAsync(checkTokens), wrapAsync(savePreference));
router.get("/preference", wrapAsync(checkTokens), wrapAsync(getUserPreference));

module.exports = router;
