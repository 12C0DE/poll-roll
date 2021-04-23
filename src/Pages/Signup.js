import React, { useCallback, useContext, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../Firebase/firebase";
import { SignInEnums } from "../Enums/SignInEnums";
import { PhoneVerification } from "../Components/PhoneVerification";
import { GlobalContext } from "../Context/GlobalState";

const Signup = ({ history }) => {
  const { phone, code } = useContext(GlobalContext);
  const [signInType, setSignInType] = useState(SignInEnums.None);

  const signInTypeHandler = (e, signEnum) => {
    e.preventDefault();

    setSignInType(signEnum);
  };

  const displaySignIn = (type) => {
    switch (type) {
      case SignInEnums.Email:
        return (
          <React.Fragment>
            <h4>Email</h4>
            <input name="emailS" type="email" />
            <h4>Password</h4>
            <input name="passwordS" type="password" />
            <h4>Confirm Password</h4>
            <input name="confirmpwdS" type="password" />
            <div className="center" id="logInDiv">
              <button onClick={handleSignUp}>Sign Up</button>
            </div>
          </React.Fragment>
        );
      case SignInEnums.Phone:
        return <PhoneVerification />;
      default:
        return null;
    }
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        emailS,
        passwordS,
        confirmpwdS,
        fnameS,
        lnameS,
      } = event.target.elements;

      if (signInType === SignInEnums.Email) {
        if (passwordS.value !== confirmpwdS.value) {
          alert("Password does not match");
          return;
        }

        try {
          await auth.createUserWithEmailAndPassword(
            emailS.value,
            passwordS.value
          );

          db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("info")
            .add({ fname: fnameS.value, lname: lnameS.value })
            .then(() => {
              history.push("/home");
            });
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        //phone sign in
        try {
          await auth.signInWithPhoneNumber(phone, code).then(() => {
            history.push("/home");
          });
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }
    },
    [history]
  );

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
