const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;
    // basic validation
    if (!email || !password || !passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter all required fields",
      });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice for verification",
      });
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
