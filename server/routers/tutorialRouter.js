const { Router } = require("express");
const Tutorial = require("../models/tutorialModel");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const tutorials = await Tutorial.find({ user: req.user });
    res.json(tutorials);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", auth, async (req, res) => {
  try {
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
      user: req.user,
    });

    const savedTutorial = await newTutorial.save();

    res.json(savedTutorial);
  } catch (error) {
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { img, title, description } = req.body;
    const tutorialId = req.params.id;

    if (!title && !description) {
      return res.status(400).json({
        errorMessage: "you must put Title and Description",
      });
    }

    if (!tutorialId)
      return res.status(400).json({
        errorMessage: "Tutorial id not supplied. Please contact the developer",
      });

    const originalTutorial = await Tutorial.findById(tutorialId);
    if (!originalTutorial)
      return res.status(400).json({
        errorMessage:
          "No tutorial with this ID is found. Please contact the developer",
      });

    originalTutorial.img = img;
    originalTutorial.title = title;
    originalTutorial.description = description;

    const savedTutorial = await originalTutorial.save();
    res.json(savedTutorial);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tutorialId = req.params.id; // identify the tutorial by id

    if (!tutorialId)
      // if there is no tutorial id..
      return res.status(400).json({
        errorMessage: "Tutorial id not supplied. Please contact the developer",
      });

    const existingTutorial = await Tutorial.findById(tutorialId); // wait for the tutorial set to be deleted
    if (!existingTutorial)
      // if there is no tutorial with such ID..
      return res.status(400).json({
        errorMessage:
          "No tutorial with this ID is found. Please contact the developer",
      });

    await existingTutorial.delete(); // delete the tutorial
    res.json(existingTutorial); // responce back the deleted tutorial info
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
