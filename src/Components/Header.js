import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="headerDiv">
      <h1>
        <Link to="/">Poll Roll</Link>
      </h1>
    </div>
  );
};
