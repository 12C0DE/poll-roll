import React, { useCallback, useContext, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { GlobalContext } from "../Context/GlobalState";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = ({ history }) => {
  const { pollId } = useParams();
  const { setUser, setVoteIdParam } = useContext(GlobalContext);

  useEffect(() => {
    pollId && setVoteIdParam(pollId);
  }, []);

  const handleLogin = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      await auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
          axios
            .get(
              `https://pollroll-api.herokuapp.com/users/${auth.currentUser.uid}`
            )
            .then((usr) => {
              setUser(usr.data);
            });
        })
        .then(() => {
          pollId
            ? history.push(`/voting/${pollId}`)
            : history.push(`/home/${auth.currentUser.uid}`);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-center py-4">Log In</h1>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col no-wrap items-center space-y-8 "
      >
        <TextField
          id="txtEmail"
          name="email"
          label="Email"
          variant="outlined"
          className="w-1/2 max-w-md"
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          className="w-1/2 max-w-md"
        />
        <div>
          <Button variant="contained" type="submit" style={{ width: 250 }}>
            Login
          </Button>
        </div>
      </form>
      <div className="flex flex-col mt-4">
        <h3 className="text-center">
          {"or"}
          <Link
            className="underline-offset-4 decoration-double px-2"
            style={{
              textDecoration: "underline",
              color: "#27A6F9",
            }}
            to="/signup"
          >
            Sign Up
          </Link>
          {"here"}
        </h3>
      </div>
    </div>
  );
};

export default withRouter(Login);
