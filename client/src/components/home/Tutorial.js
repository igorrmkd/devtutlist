import React from "react";
import defaultTutorial from "../../img/defaultTutorial.jpg";

const Tutorial = ({ tutorial }) => {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;
  return (
    <div>
      {defaultimg}
      {tutorial.title && <h2>{tutorial.title}</h2>}
      {tutorial.description && <h2>{tutorial.description}</h2>}
    </div>
  );
};

export default Tutorial;
