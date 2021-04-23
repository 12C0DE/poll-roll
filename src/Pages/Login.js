import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { AuthContext } from "../Firebase/Auth";
import { SignInEnums } from "../Enums/SignInEnums";

const Login = ({ history }) => {
  const [phone, setPhone] = useState(0);
  const [code, setCode] = useState(0);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/home");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="loginContainer">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <h4>E-mail</h4>
        <input
          id="txtEmail"
          type="text"
          name="email"
          value={"test7@gmail.com"}
        />
        <h4>Password</h4>
        <input id="txtpwd" type="password" value={123456789} name="password" />
        <div className="center" id="logInDiv">
          <button>Log In with Email</button>
        </div>
        <h4>Phone Number</h4>
        <input
          id="txtPhone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className="center" id="logInDiv">
          {/* <button onClick={(e) => LogInHandler(e, SignInEnums.Phone)}>
            Log In with Phone
          </button> */}
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
