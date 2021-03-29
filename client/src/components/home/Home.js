import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./Home.scss";
import "./Modal.scss";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTut, setNewTut] = useState(false);
  const [editTutorialData, setEditTutorialData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    getTutorials();
  }, []);

  async function getTutorials() {
    const tutorialsRes = await Axios.get("http://localhost:5000/tutorial/");
    setTutorials(tutorialsRes.data);
  }

  function editTutorial(tutorialData) {
    setEditTutorialData(tutorialData);
    setNewTut(true);
  }
  function clearEditTutorialForm() {
    setEditTutorialData(null);
  }

  function renderTutorials() {
    let sortedTutorials = [...tutorials];
    sortedTutorials = sortedTutorials.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedTutorials.map((tutorial, i) => {
      return (
        <Tutorial
          key={i}
          tutorial={tutorial}
          getTutorials={getTutorials}
          editTutorial={editTutorial}
        />
      );
    });
  }

  return (
    <div className="home">
      {!user && (
        <main className="main">
          <h2>Welcome to WebDev tutorials</h2>
          <p> Start creating your own list of tutorials</p>
          <p>
            {" "}
            after you{" "}
            <span>
              <Link to="/register">
                <button>Create</button>
              </Link>
            </span>{" "}
            an account
          </p>
          <div>
            <h2>I will Show something here</h2>
            <h2>but only for not logged in visitors</h2>
          </div>
        </main>
      )}

      {!newTut && user && (
        <section className="addtut">
          <button className="add" onClick={() => setNewTut(true)}>
            Add your favorite tutorials
          </button>
        </section>
      )}
      {newTut && (
        <div className="modal-container">
          <div className="modal-position">
            <TutorialEditor
              setNewTut={setNewTut}
              getTutorials={getTutorials}
              newTut={newTut}
              editTutorialData={editTutorialData}
              clearEditTutorialForm={clearEditTutorialForm}
            />
          </div>
        </div>
      )}
      {tutorials.length > 0 && (
        <div className="myTutorials">{renderTutorials()}</div>
      )}
    </div>
  );
};

export default Home;
