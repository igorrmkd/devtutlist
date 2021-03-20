import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

const Register = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPassVerify, setFormPassVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { getUser } = useContext(UserContext);
  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPassVerify,
    };

    try {
      await axios.post("http://localhost:5000/auth/", registerData);
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
    <div>
      <h2>Register a new account</h2>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
      )}
      <form onSubmit={register}>
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
        <label htmlFor="form-passVerify">Confirm Password</label>
        <input
          id="form-passVerify"
          type="password"
          value={formPassVerify}
          onChange={e => setFormPassVerify(e.target.value)}
        />

        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
