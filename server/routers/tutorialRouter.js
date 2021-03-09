const { Router } = require("express");
const Tutorial = require("../models/tutorialModel");
const router = Router();

router.post("/", async (req, res) => {
  const { img, title, description } = req.body;
  // validation
  if (!title && !description) {
    return res.status(400).json({
      errorMessage: "you must put Title and Description",
    });
  }

  const newTutorial = new Tutorial({
    img,
    title,
    description,
  });

  const savedTutorial = await newTutorial.save();

  res.json(savedTutorial);
});

module.exports = router;
