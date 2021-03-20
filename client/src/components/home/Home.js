import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

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
    <div>
      {!newTut && user && (
        <button onClick={() => setNewTut(true)}>Add Tutorial</button>
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
      {tutorials.length > 0 && renderTutorials()}
      {user === null && (
        <div>
          <h2>Welcome to WebDev tutorials</h2>
          <p>
            <Link to="/register">Register here </Link>
            <span>to put your own tutorials on the list</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
