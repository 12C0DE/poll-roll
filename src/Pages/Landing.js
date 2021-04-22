import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <h2>Create polls with Poll Roll</h2>
      <blockquote>
        Send a poll out to friends for choosing dates, lists of options, True or
        False questions, even multiple polls within one! All your decisions that
        need answers in one place. Take your roll call with Poll Roll.
      </blockquote>
      <div>
        <button>
          <Link to="/login">Log In</Link>
        </button>
        <button>
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};
