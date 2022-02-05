import React, { useCallback, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import axios from "axios";

const Signup = ({ history }) => {
  const { voteIdParam, setUser } = useContext(GlobalContext);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();

      const { emailS, passwordS, confirmPwdS, fnameS, lnameS } =
        event.target.elements;

      if (passwordS.value !== confirmPwdS.value) {
        alert("Password does not match");
        return;
      }

      try {
        await auth
          .createUserWithEmailAndPassword(emailS.value, passwordS.value)
          .then(() => {
            const newUser = {
              fname: fnameS.value,
              lname: lnameS.value,
              authId: auth.currentUser.uid,
              email: emailS.value,
            };

            axios.post("/users/post", newUser).then((user) => {
              setUser(user.data);

              voteIdParam
                ? history.push(`/voting/${voteIdParam}`)
                : history.push("/home");
            });
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="signUpContainer">
      <h1 className="signUp">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="nameContainer">
          <h4>First name</h4>
          <input name="fnameS" type="text" />
          <h4>Last name</h4>
          <input name="lnameS" type="text" />
        </div>
        <div>
          <h4>Email</h4>
          <input name="emailS" type="email" />
          <h4>Password</h4>
          <input name="passwordS" type="password" />
          <h4>Confirm Password</h4>
          <input name="confirmPwdS" type="password" />
        </div>
        <div className="center" id="logInDiv">
          <button type="submit">Sign Up</button>
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
