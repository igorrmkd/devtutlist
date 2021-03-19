import axios from "axios";
import React, { useState, useContext } from "react";
import userContext from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const { getUser } = useContext(userContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    await axios.post("http://localhost:5000/auth/login", loginData);

    await getUser();
    history.push("/");
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={login}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={formEmail}
          onChange={e => setFormEmail(e.target.value)}
        />
        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={formPassword}
          onChange={e => setFormPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <p>
          Don't have an account yet? <Link to="/register">Register here</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Login;
