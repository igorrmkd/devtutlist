import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  async function logout() {
    await axios.get("http://localhost:5000/auth/logout");
  }

  return (
    <div>
      <Link to="/">
        <h1>WebDev tutorials</h1>
      </Link>
      {!user ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={logout}>Log out</button>
      )}
    </div>
  );
};

export default Navbar;
