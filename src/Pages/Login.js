import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { AuthContext } from "../Firebase/Auth";
import { GlobalContext } from "../Context/GlobalState";
import axios from "axios";

const Login = ({ history }) => {
  const [phone, setPhone] = useState(0);
  const { setUser } = useContext(GlobalContext);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await auth
          .signInWithEmailAndPassword(email.value, password.value)
          .then(() => {
            axios.get(`/users/${auth.currentUser.uid}`).then((usr) => {
              setUser(usr.data);
            });

            history.push(`/home/${auth.currentUser.uid}`);
          });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currUser } = useContext(AuthContext);

  if (currUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="loginContainer">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <h4>E-mail</h4>
        <input id="txtEmail" type="text" name="email" value={"t50@gmail.com"} />
        <h4>Password</h4>
        <input
          id="txtpwd"
          type="password"
          value={"wefds2344"}
          name="password"
        />
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
