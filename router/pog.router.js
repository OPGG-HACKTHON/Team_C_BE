const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getPOGList = require("../controller/pog/getPOGList");
const getPOGResult = require("../controller/pog/getPOGResult");
const votePOG = require("../controller/pog/votePOG");
const { checkTokens } = require("../util/checkTokens");

const router = express.Router();

router.get("/list", wrapAsync(getPOGList));
router.get("/result", wrapAsync(getPOGResult));
router.post("/vote", wrapAsync(checkTokens), wrapAsync(votePOG));

module.exports = router;
