import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";
import UserContext from "../../context/UserContext";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTut, setNewTut] = useState(false);
  const [editTutorialData, setEditTutorialData] = useState(null);

  const user = useContext(UserContext);

  useEffect(() => {
    // get the tuts
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
        />
      )}
      {renderTutorials()}
    </div>
  );
};

export default Home;
