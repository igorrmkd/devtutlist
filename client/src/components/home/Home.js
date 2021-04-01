import React, { useEffect, useState, useContext, useRef } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";
import UserContext from "../../context/UserContext";
import learn from "../../img/learn.png";
import button from "../../img/button.png";
import ScrollToTop from "./ScrollToTop";
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

  const myRef = useRef(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      {!user && (
        <main className="main">
          <section className="hero-section">
            <div className="hero-wrap">
              <div className="hero">
                <div className="main-title">
                  <h1>The Best WebDev Tutorials</h1>
                  <h2>for beginners</h2>
                </div>

                <div className="intro-section">
                  <h2>Scroll down to check some of the</h2>
                  <h2>best tutorials online</h2>
                  <img
                    src={button}
                    onClick={executeScroll}
                    className="button-arrow"
                    alt="arrow"
                  ></img>
                </div>
              </div>
              <img src={learn} className="learn" alt="direction"></img>
            </div>
          </section>
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
        <div ref={myRef} className="myTutorials">
          {renderTutorials()}
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default Home;
