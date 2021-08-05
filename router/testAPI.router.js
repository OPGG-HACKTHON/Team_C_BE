const express = require("express");

const router = express.Router();

router.post("/test", (req, res) => {
  console.log("hi");
  if (req.body) {
    res.status(200).json({ success: true });
  } else {
    return res.status(400).json;
  }
});
module.exports = router;
