import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  const { user, getUser } = useContext(UserContext);

  async function logout() {
    await axios.get("http://localhost:5000/auth/logout");
    await getUser();
  }

  return (
    <div>
      <Link to="/">
        <h1>WebDev tutorials</h1>
      </Link>
      {user === null ? (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        user && <button onClick={logout}>Log out</button>
      )}
    </div>
  );
};

export default Navbar;
