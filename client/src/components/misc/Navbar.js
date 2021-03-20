import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Link to="/">
        <h1>WebDev tutorials</h1>
      </Link>
      {!user && (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
