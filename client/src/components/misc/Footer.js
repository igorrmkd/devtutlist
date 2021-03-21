const Footer = () => {
  let date = new Date().getFullYear();
  return (
    <div>
      <p>&copy; Copyright WebDevClub {date}</p>
    </div>
  );
};

export default Footer;
