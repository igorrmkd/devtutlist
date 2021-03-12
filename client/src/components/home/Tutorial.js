import React from "react";
import defaultTutorial from "../../img/defaultTutorial.jpg";

const Tutorial = ({ tutorial }) => {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;
  let newImgUrl = tutorial.img;
  let newImg = <img src={newImgUrl} alt="tutorial" />;

  return (
    <div>
      {tutorial.img ? newImg : defaultimg}
      {tutorial.title && <h2>{tutorial.title}</h2>}
      {tutorial.description && <h2>{tutorial.description}</h2>}
    </div>
  );
};

export default Tutorial;
