const express = require("express");
const wrapAsync = require("../util/wrapAsync");

const getSchedule = require("../controller/info/getSchedule.js");

const router = express.Router();

router.get("/schedule", wrapAsync(getSchedule));

module.exports = router;
