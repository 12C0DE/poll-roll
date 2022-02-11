import React, { useContext } from "react";
import { auth } from "../Firebase/firebase";
import { GlobalContext } from "../Context/GlobalState";
import { Link } from "react-router-dom";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const Logout = () => {
  const { setVoteIdParam } = useContext(GlobalContext);

  const logOutHandler = () => {
    setVoteIdParam(null);
    auth.signOut();
  };

  return (
    <Link to="/login" onClick={() => logOutHandler()}>
      <LogoutRoundedIcon />
    </Link>
  );
};
