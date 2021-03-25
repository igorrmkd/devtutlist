import React from "react";
import "./ErrorMessage.scss";

function ErrorMessage({ message, clear }) {
  return (
    <section>
      <p className="title">{message}</p>
      <button className="clear-btn" onClick={clear}>
        Clear
      </button>
    </section>
  );
}

export default ErrorMessage;
