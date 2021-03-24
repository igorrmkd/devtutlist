import React from "react";
import Axios from "axios";
import defaultTutorial from "../../img/defaultTutorial.jpg";
import "./Tutorial.scss";

function Tutorial({ tutorial, getTutorials, editTutorial }) {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;
  let newImgUrl = tutorial.img;
  let newImg = <img src={newImgUrl} alt="tutorial" />;

  async function deleteTutorial() {
    if (window.confirm("Do you want to delete the content form the list?")) {
      await Axios.delete(`http://localhost:5000/tutorial/${tutorial._id}`);
      getTutorials();
    }
  }

  return (
    <div>
      {tutorial.img ? newImg : defaultimg}
      {tutorial.title && <h2>{tutorial.title}</h2>}
      {tutorial.description && <h2>{tutorial.description}</h2>}
      <button onClick={() => editTutorial(tutorial)}>Edit</button>
      <button onClick={deleteTutorial}>Delete</button>
    </div>
  );
}

export default Tutorial;
