import React from "react";
import Axios from "axios";

import defaultTutorial from "../../img/defaultTutorial.jpg";

function Tutorial({ tutorial, getTutorials }) {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;
  let newImgUrl = tutorial.img;
  let newImg = <img src={newImgUrl} alt="tutorial" />;

  async function deleteTutorial() {
    await Axios.delete(`http://localhost:5000/tutorial/${tutorial._id}`);
    getTutorials();
  }

  return (
    <div>
      {tutorial.img ? newImg : defaultimg}
      {tutorial.title && <h2>{tutorial.title}</h2>}
      {tutorial.description && <h2>{tutorial.description}</h2>}
      <button onClick={deleteTutorial}>Delete</button>
    </div>
  );
}

export default Tutorial;
