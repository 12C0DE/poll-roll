import React, { useContext } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Firebase/Auth";

export const Header = () => {
  debugger;
  const { user } = useContext(AuthContext);
  
  return (
    <div className="headerDiv">
      <h1>
        <Link to={user ? `/home/${user.uid}` : "/home"}>Poll Roll</Link>
      </h1>
    </div>
  );
};
