const { Router } = require("express");
const Tutorial = require("../models/tutorialModel");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
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
    });

    const savedTutorial = await newTutorial.save();

    res.json(savedTutorial);
  } catch (error) {
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
    // res.json(existingTutorial); //if you want to show the deleted tutorial
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
