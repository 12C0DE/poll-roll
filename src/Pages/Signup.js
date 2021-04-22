import React, { useCallback, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { auth, db } from "../Firebase/firebase";

const Signup = ({ history }) => {
  const { user } = useContext(GlobalContext);
  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      confirmpwd,
      fname,
      lname,
      phone,
    } = event.target.elements;
  });

  return (
    <div className="signUpContainer">
      <h1 className="signUp">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="nameContainer">
          <h4>First name</h4>
          <input name="fname" type="text" />
          <h4>Last name</h4>
          <input name="lname" type="text" />
          <h4>Email</h4>
          <input id="txtEmail2" name="email" type="email" />
          <h4>Password</h4>
          <input name="password" type="password" />
          <h4>Confirm Password</h4>
          <input name="confirmpwd" type="password" />
        </div>
        <div className="center" id="logInDiv">
          <Button
            variant="contained"
            style={saveBtn}
            size="large"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
      <div>
        <h3 className="center">
          already have an account?<Link to="/login"> Log in</Link> here
        </h3>
      </div>
    </div>
  );
};

export default withRouter(Signup);
