const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const { checkTokens } = require("../util/checkTokens");
const create = require("../controller/tinderApi/create");
const router = express.Router();

router.post("/create", wrapAsync(checkTokens), wrapAsync(create));

module.exports = router;
