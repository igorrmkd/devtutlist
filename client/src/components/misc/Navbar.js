import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Navbar.scss";

const Navbar = () => {
  const { user, getUser } = useContext(UserContext);

  async function logout() {
    await axios.get("http://localhost:5000/auth/logout");
    await getUser();
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>WebDev.Club</h1>
        </Link>
      </div>
      <div className="links">
        {user === null ? (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          user && <button onClick={logout}>Log out</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
