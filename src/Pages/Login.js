import React, { useCallback, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { GlobalContext } from "../Context/GlobalState";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = ({ history }) => {
  const { setUser, voteIdParam } = useContext(GlobalContext);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await auth
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => {
            axios
              .get(`https://pollroll.net/api/users/${auth.currentUser.uid}`)
              .then((usr) => {
                setUser(usr.data);
              });
          })
          .then(() => {
            voteIdParam
              ? history.push(`/voting/${voteIdParam}`)
              : history.push(`/home/${auth.currentUser.uid}`);
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-center py-4">Log In</h1>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col no-wrap items-center space-y-4 "
      >
        <TextField
          id="txtEmail"
          name="email"
          label="Email"
          variant="filled"
          value="rh@gmail.com"
          className="w-1/2 max-w-md"
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="filled"
          value="123456"
          className="w-1/2 max-w-md"
        />
        <div className="center" id="logInDiv">
          <Button variant="contained" type="submit" style={{ width: 250 }}>
            Login
          </Button>
        </div>
      </form>
      <div className="flex flex-col mt-4">
        <h3 className="text-center">
          {"or"}
          <Button href="#">
            <Link to="/signup">sign up</Link>
          </Button>
          {"here"}
        </h3>
      </div>
    </div>
  );
};

export default withRouter(Login);
