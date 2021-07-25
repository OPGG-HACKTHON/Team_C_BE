const express = require("express");
const create = require("../controller/create");

const router = express.Router();

router.post("/create", create);

module.exports = router;
