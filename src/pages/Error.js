import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h2>IT'S A TRAP! That page is unavailable!</h2>
      <Link to="/">Back to homeworld</Link>
    </div>
  );
};

export default Error;
