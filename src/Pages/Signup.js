import React, { useCallback, useContext, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase/firebase";
import { SignInEnums } from "../Enums/SignInEnums";
import { PhoneVerification } from "../Components/PhoneVerification";
import { GlobalContext } from "../Context/GlobalState";

const Signup = ({ history }) => {
  const { phone, code } = useContext(GlobalContext);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [signInType, setSignInType] = useState(SignInEnums.None);

  const signInTypeHandler = (e, signEnum) => {
    e.preventDefault();

    setSignInType(signEnum);
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();

      if (signInType === SignInEnums.Email) {
        if (password !== confirmPwd) {
          alert("Password does not match");
          return;
        }

        try {
          await auth.createUserWithEmailAndPassword(email, password);

          db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("info")
            .add({ fname: fname, lname: lname })
            .then(() => {
              history.push("/home");
            });
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        //phone sign in
        // await auth.signInWithPhoneNumber(phone, code).then(() => {
        //   history.push("/home");
        // });
      }
    },
    [history]
  );

  const displaySignIn = (type) => {
    switch (type) {
      case SignInEnums.Email:
        return (
          <React.Fragment>
            <h4>Email</h4>
            <input
              name="emailS"
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h4>Password</h4>
            <input
              name="passwordS"
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4>Confirm Password</h4>
            <input
              name="confirmpwdS"
              type="password"
              required={true}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <div className="center" id="logInDiv">
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </React.Fragment>
        );
      case SignInEnums.Phone:
        return (
          <React.Fragment>
            <PhoneVerification />
            <button onClick={handleSignUp}>Verify</button>
          </React.Fragment>
        );
      default:
        return null;
    }
  };

  const signInDiv = displaySignIn(signInType);
  return (
    <div className="signUpContainer">
      <h1 className="signUp">Sign Up</h1>
      <form>
        <div className="nameContainer">
          <h4>First name</h4>
          <input name="fnameS" type="text" />
          <h4>Last name</h4>
          <input name="lnameS" type="text" />
        </div>
        <div>
          <h4>Sign up with</h4>
          <button onClick={(e) => signInTypeHandler(e, SignInEnums.Email)}>
            Email
          </button>
          <button onClick={(e) => signInTypeHandler(e, SignInEnums.Phone)}>
            Phone
          </button>
        </div>
        {signInDiv}
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
