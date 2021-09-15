const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getPOGList = require("../controller/pog/getPOGList");
const getPOGResult = require("../controller/pog/getPOGResult");
const votePOG = require("../controller/pog/votePOG");
const pushPOGCnt = require("../controller/pog/pushPOGCnt");
const pushPOGPoint = require("../controller/pog/pushPOGPoint");
const { checkTokens } = require("../util/checkTokens");

const router = express.Router();

router.get("/list", wrapAsync(getPOGList));
router.get("/result", wrapAsync(getPOGResult));
router.get("/pushPOGCnt", wrapAsync(pushPOGCnt));
router.get("/pushPOGPoint", wrapAsync(pushPOGPoint));
router.post("/vote", wrapAsync(checkTokens), wrapAsync(votePOG));

module.exports = router;
