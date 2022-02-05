import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <p>
        <i>
          If you were searching for a poll, it might have been deleted or
          expired
        </i>
      </p>
      <p>
        <Link to="/login">Go to Login</Link>
      </p>
    </div>
  );
};
