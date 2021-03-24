import "./DefaultTutorials.scss";
import defaultTutorial from "../../img/defaultTutorial.jpg";

function DefaultTutorials({ title, description }) {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;

  return (
    <div>
      {defaultimg}
      <h2>{title}</h2>
      <h2>{description}</h2>
    </div>
  );
}

export default DefaultTutorials;
