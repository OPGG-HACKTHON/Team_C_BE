const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getPOGList = require("../controller/pog/getPOGList");
const getPOGResult = require("../controller/pog/getPOGResult");

const router = express.Router();

router.get("/list", wrapAsync(getPOGList));
router.get("/result", wrapAsync(getPOGResult));

module.exports = router;
