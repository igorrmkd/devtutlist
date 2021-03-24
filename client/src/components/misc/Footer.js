import "./Footer.scss";
const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <div className="footer">
      <p>&copy; Copyright WebDevClub {date}</p>
    </div>
  );
};

export default Footer;
