import React, { useContext } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Firebase/Auth";

export const Header = () => {
  
  const { currUser } = useContext(AuthContext);

  return (
    <div className="headerDiv">
      <h1>
        <Link to={currUser ? `/home/:${currUser.uid}` : "/home"}>
          Poll Roll
        </Link>
      </h1>
    </div>
  );
};
