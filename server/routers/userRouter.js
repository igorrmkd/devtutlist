const router = require("express").Router();

router.post("/", async (req, res) => {
  res.send("it works");
});

module.exports = router;
