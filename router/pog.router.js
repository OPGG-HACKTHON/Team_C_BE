const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getPOGList = require("../controller/pog/getPOGList");

const router = express.Router();

router.get("/list", wrapAsync(getPOGList));

module.exports = router;
