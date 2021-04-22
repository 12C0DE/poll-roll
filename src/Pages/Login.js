import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { SignInEnums } from "../Enums/SignInEnums";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [code, setCode] = useState(0);

  const LogInHandler = (e, signInType) => {
    e.preventDefault();

    switch (signInType) {
      case SignInEnums.Phone:
        break;
      case SignInEnums.Email:
        auth
          .signInWithEmailAndPassword(email, password)
          .then((authUser) => {
            if (authUser) {
              history.push("/home");
            }
          })
          .catch((error) => alert(error.message));
        break;
      default:
        return;
    }
  };

  return (
    <div className="loginContainer">
      <h1>Log In</h1>
      <form>
        <h4>E-mail</h4>
        <input
          id="txtEmail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h4>Password</h4>
        <input
          id="txtpwd"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="center" id="logInDiv">
          <button onClick={(e) => LogInHandler(e, SignInEnums.Email)}>
            Log In with Email
          </button>
        </div>
        <h4>Phone Number</h4>
        <input
          id="txtPhone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="center" id="logInDiv">
          <button onClick={(e) => LogInHandler(e, SignInEnums.Phone)}>
            Log In with Phone
          </button>
        </div>
      </form>
      <div>
        <h3 className="center">
          or <Link to="/signup">sign up</Link> here
        </h3>
      </div>
    </div>
  );
};

export default withRouter(Login);
