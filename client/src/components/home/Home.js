import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";
import DefaultTutorials from "./DefaultTutorials";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTut, setNewTut] = useState(false);
  const [editTutorialData, setEditTutorialData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      // if no user is loged in..
      setTutorials([]); // clear the tutorials
      return; // return and dont get any tutorials
    } else getTutorials(); // get the tuts
  }, [user]);

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
        </main>
      )}

      {!newTut && user && (
        <container className="addtut">
          <button className="add" onClick={() => setNewTut(true)}>
            Add Tutorial
          </button>
        </container>
      )}
      {newTut && (
        <TutorialEditor
          setNewTut={setNewTut}
          getTutorials={getTutorials}
          newTut={newTut}
          editTutorialData={editTutorialData}
          clearEditTutorialForm={clearEditTutorialForm}
        />
      )}
      {tutorials.length > 0 && (
        <div className="myTutorials">{renderTutorials()}</div>
      )}
      {user === null && (
        <div className="tutorials">
          <DefaultTutorials
            title="Your First Favorite Tutorial"
            description="Tutorial description"
          />
          <DefaultTutorials
            title="Your Second Favorite Tutorial"
            description="Tutorial description"
          />
          <DefaultTutorials
            title="Your Third Favorite Tutorial"
            description="Tutorial description"
          />
          <DefaultTutorials
            title="Your Forth Favorite Tutorial"
            description="Tutorial description"
          />
          <DefaultTutorials
            title="Your Fifth Favorite Tutorial"
            description="Tutorial description"
          />
          <DefaultTutorials
            title="Your Sixth Favorite Tutorial"
            description="Tutorial description"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
