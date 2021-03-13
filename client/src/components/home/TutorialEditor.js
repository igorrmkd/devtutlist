import React, { useState } from "react";
import axios from "axios";

function TutorialEditor(props) {
  const [imgLink, setImgLink] = useState("");
  const [tutName, setTutName] = useState("");
  const [description, setDescription] = useState("");

  async function saveTutorial(e) {
    e.preventDefault();

    const tutorialData = {
      img: imgLink ? imgLink : undefined,
      title: tutName ? tutName : undefined,
      description: description ? description : undefined,
    };
    await axios.post("http://localhost:5000/tutorial/", tutorialData);

    closeTutForm();
    props.getTutorials();
  }

  function closeTutForm() {
    props.setNewTut(false);
    setImgLink("");
    setTutName("");
    setDescription("");
  }

  return (
    <div>
      <form onSubmit={saveTutorial}>
        <label htmlFor="image-link">Image</label>
        <input
          id="image-link"
          type="text"
          value={imgLink}
          onChange={e => setImgLink(e.target.value)}
        ></input>
        <label htmlFor="tutorial-name">Title</label>
        <input
          id="tutorial-name"
          type="text"
          value={tutName}
          onChange={e => setTutName(e.target.value)}
        ></input>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Save changes</button>
        <button type="button" onClick={closeTutForm}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default TutorialEditor;
