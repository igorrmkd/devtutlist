import "./DefaultTutorials.scss";
import defaultTutorial from "../../img/defaultTutorial.jpg";

function DefaultTutorials({ title, description }) {
  const defaultimg = <img src={defaultTutorial} alt="tutorialImage" />;

  return (
    <div className="defaultTutorial">
      {defaultimg}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default DefaultTutorials;
