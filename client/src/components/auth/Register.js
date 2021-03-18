import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPassVerify, setFormPassVerify] = useState("");

  async function register(e) {
    e.preventDefault();

    const registerData = {
      email: formEmail,
      password: formPassword,
      passwordVerify: formPassVerify,
    };

    await axios.post("http://localhost:5000/auth/", registerData);
  }

  return (
    <div>
      <h2>Register a new account</h2>
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