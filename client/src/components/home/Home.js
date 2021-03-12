import React, { useEffect, useState } from "react";
import axios from "axios";
import Tutorial from "./Tutorial";

const Home = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTut, setNewTut] = useState(false);

  useEffect(() => {
    // get the tuts
    getTutorials();
  }, []);

  async function getTutorials() {
    const tutorialsRes = await axios.get("http://localhost:5000/tutorial/");
    setTutorials(tutorialsRes.data);
  }

  function renderTutorials() {
    return tutorials.map((tutorial, i) => {
      return <Tutorial key={i} tutorial={tutorial} />;
    });
  }

  return (
    <div>
      {!newTut && <button onClick={() => setNewTut(true)}>Add Tutorial</button>}
      {renderTutorials()}
    </div>
  );
};

export default Home;
