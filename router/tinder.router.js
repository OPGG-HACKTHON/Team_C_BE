const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const { checkTokens } = require("../util/checkTokens");
const create = require("../controller/tinderApi/create");
const history = require("../controller/tinderApi/getHistory");
const getTinder = require("../controller/tinderApi/getTinder");
const createReport = require("../controller/tinderApi/createReport");
const updateLike = require("../controller/tinderApi/updateLike");
const getTopTinder = require("../controller/tinderApi/getTopTinder");
const getHOF = require("../controller/tinderApi/getHOF");
const getTotalLike = require("../controller/tinderApi/getTotalLike");
const getTotalTinder = require("../controller/tinderApi/getTotalTinder");
const pushTinder = require("../controller/tinderApi/pushTinder");

const router = express.Router();

router.post("/create", wrapAsync(checkTokens), wrapAsync(create));
router.get("/history", wrapAsync(checkTokens), wrapAsync(history));
router.get("/", wrapAsync(checkTokens), wrapAsync(getTinder));
router.post("/report", wrapAsync(checkTokens), wrapAsync(createReport));
router.put("/react", wrapAsync(checkTokens), wrapAsync(updateLike));
router.get("/toptinder", wrapAsync(checkTokens), wrapAsync(getTopTinder));
router.get("/hof", wrapAsync(checkTokens), wrapAsync(getHOF));
router.get("/totalLike", wrapAsync(checkTokens), wrapAsync(getTotalLike));
router.get("/totalTinder", wrapAsync(checkTokens), wrapAsync(getTotalTinder));
router.post("/pushTinder", wrapAsync(pushTinder));
module.exports = router;
