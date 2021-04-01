import { withRouter } from "react-router-dom";
import "./Footer.scss";
const Footer = props => {
  let date = new Date().getFullYear();
  const { location } = props;
  if (location.pathname.match(/register/) || location.pathname.match(/login/)) {
    return null;
  }

  return (
    <div className="footer">
      <p>&copy; WebDev.Club {date}</p>
    </div>
  );
};

const FooterThatHides = withRouter(Footer);

export default FooterThatHides;
