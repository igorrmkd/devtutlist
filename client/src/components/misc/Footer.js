import { withRouter } from "react-router-dom";
import email from "../../img/mail.png";

import "./Footer.scss";
const Footer = props => {
  let date = new Date().getFullYear();
  const { location } = props;
  if (location.pathname.match(/register/) || location.pathname.match(/login/)) {
    return null;
  }

  const mailIcon = <img src={email} className="email-icon" alt="contact"></img>;
  return (
    <div className="footer">
      <a href="mailto:igorrmkd@outlook.com">
        Contact
        <span>{mailIcon}</span>
      </a>
      <p>&copy; WebDev.Club {date}</p>
    </div>
  );
};

const FooterThatHides = withRouter(Footer);

export default FooterThatHides;
