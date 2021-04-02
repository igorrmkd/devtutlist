import React, { useContext } from "react";
import domain from "../../util/domain";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import defaultTutorial from "../../img/defaultTutorial.jpg";
import "./Tutorial.scss";

function Tutorial({ tutorial, getTutorials, editTutorial }) {
  const { user } = useContext(UserContext);
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;
  let newImgUrl = tutorial.img;
  let newImg = <img src={newImgUrl} alt="tutorial" />;

  async function deleteTutorial() {
    if (window.confirm("Do you want to delete the content form the list?")) {
      await Axios.delete(`${domain}/tutorial/${tutorial._id}`);
      getTutorials();
    }
  }

  let showBtns =
    user !== tutorial.user ? "p-padding-for-visitors" : "p-for-users";

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
      {tutorial.description && (
        <p className={showBtns}>{tutorial.description}</p>
      )}
      <section className="buttons">
        {user === tutorial.user && (
          <button className="edit" onClick={() => editTutorial(tutorial)}>
            Edit
          </button>
        )}
        {user === tutorial.user && (
          <button className="delete" onClick={deleteTutorial}>
            Delete
          </button>
        )}
      </section>
    </div>
  );
}

export default Tutorial;
