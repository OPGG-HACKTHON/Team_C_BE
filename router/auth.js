const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/wrapAsync");

const getUser = require("../controller/oAuthApi/getUser");
const login = require("../controller/oAuthApi/login");
const signup = require("../controller/oAuthApi/signup");
const signout = require("../controller/oAuthApi/signout");
const { checkTokens } = require("../util/checkTokens");
router.post("/login", wrapAsync(login));
router.post("/signup", wrapAsync(signup));
router.delete("/signout", wrapAsync(checkTokens), wrapAsync(signout));
router.get("/read", wrapAsync(checkTokens), wrapAsync(getUser));

module.exports = router;
