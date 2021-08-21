const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const { checkTokens } = require("../util/checkTokens");
const create = require("../controller/tinderApi/create");
const history = require("../controller/tinderApi/getHistory");
const getTinder = require("../controller/tinderApi/getTinder");
const router = express.Router();

router.post("/create", wrapAsync(checkTokens), wrapAsync(create));
router.get("/history", wrapAsync(checkTokens), wrapAsync(history));
router.get("/", wrapAsync(checkTokens), wrapAsync(getTinder));

module.exports = router;
