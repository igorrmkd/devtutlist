import React from "react";

function ErrorMessage({ message, clear }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={clear}>Clear</button>
    </div>
  );
}

export default ErrorMessage;
