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
    <div className="mytutorial">
      <a
        className="img-link"
        href={tutorial.url}
        target="_blank"
        rel="noreferrer noopener"
      >
        {tutorial.img ? newImg : defaultimg}
      </a>
      {tutorial.title && <h3>{tutorial.title}</h3>}
      {tutorial.description && <p>{tutorial.description}</p>}
      <section className="buttons">
        <button className="edit" onClick={() => editTutorial(tutorial)}>
          Edit
        </button>
        <button className="delete" onClick={deleteTutorial}>
          Delete
        </button>
      </section>
    </div>
  );
}

export default Tutorial;
