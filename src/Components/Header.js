import React, { useContext } from "react";
import "../styles/header.css";
import "../styles/main.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Firebase/Auth";
import { Logout } from "./Logout";

export const Header = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="headerDiv flex flex-row">
      <div className="basis-1/6 flex-none"></div>
      <div className="basis-4/6 flex content-center justify-center">
        <h1 className="font-title">
          <Link to={user ? `/home/${user.uid}` : "/home"}>pollroll</Link>
        </h1>
      </div>
      <div className="basis-1/6 flex justify-end">
        {location.pathname === "/" ? null : location.pathname ===
          "/login" ? null : location.pathname === "/signup" ? null : (
          <Logout className="text-white justify-self-end" />
        )}
      </div>
    </div>
  );
};
