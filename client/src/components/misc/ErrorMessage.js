import React from "react";
import "./ErrorMessage.scss";

function ErrorMessage({ message, clear }) {
  return (
    <section>
      <p className="title">
        {message}
        <span>
          <button className="clear-btn" onClick={clear}>
            Clear
          </button>
        </span>
      </p>
    </section>
  );
}

export default ErrorMessage;
