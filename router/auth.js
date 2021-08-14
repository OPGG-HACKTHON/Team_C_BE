const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/wrapAsync");

const getUser = require("../controller/oAuthApi/getUser");
const login = require("../controller/oAuthApi/login");
const { checkTokens } = require("../util/checkTokens");
router.post("/login", wrapAsync(login));

router.get("/read", checkTokens, wrapAsync(getUser));

module.exports = router;
