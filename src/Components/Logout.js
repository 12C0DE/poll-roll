import React from "react";
import { auth } from "../Firebase/firebase";
import { Link } from "react-router-dom";

export const Logout = () => {
  return (
    <Link to="/landing" onClick={() => auth.signOut()}>
      Log Out
    </Link>
  );
};
