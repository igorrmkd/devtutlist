import axios from "axios";
import React, { useState, useContext } from "react";
import userContext from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../misc/ErrorMessage";
import "../../style/forms.scss";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { getUser } = useContext(userContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      email: formEmail,
      password: formPassword,
    };

    try {
      await axios.post("http://localhost:5000/auth/login", loginData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    await getUser();
    history.push("/");
  }

  return (
    <section>
      <main className="content">
        <div>
          <h2>Log in</h2>
          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              clear={() => setErrorMessage(null)}
            />
          )}
        </div>

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
          <p>Don't have an account yet?</p>
          <p>
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </main>
    </section>
  );
};

export default Login;
