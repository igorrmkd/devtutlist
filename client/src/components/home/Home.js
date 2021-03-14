import React, { useEffect, useState } from "react";
import Axios from "axios";
import Tutorial from "./Tutorial";
import TutorialEditor from "./TutorialEditor";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTut, setNewTut] = useState(false);

  useEffect(() => {
    // get the tuts
    getTutorials();
    // return function cleanup() {
    //   //
    // };
  }, []);

  async function getTutorials() {
    const tutorialsRes = await Axios.get("http://localhost:5000/tutorial/");
    setTutorials(tutorialsRes.data);
  }

  function renderTutorials() {
    let sortedTutorials = [...tutorials];
    sortedTutorials = sortedTutorials.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedTutorials.map((tutorial, i) => {
      return (
        <Tutorial key={i} tutorial={tutorial} getTutorials={getTutorials} />
      );
    });
  }

  return (
    <div>
      {!newTut && <button onClick={() => setNewTut(true)}>Add Tutorial</button>}
      {newTut && (
        <TutorialEditor setNewTut={setNewTut} getTutorials={getTutorials} />
      )}
      {renderTutorials()}
    </div>
  );
};

export default Home;
