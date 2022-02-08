import React, { useCallback, useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../Firebase/firebase";
import axios from "axios";

const Signup = ({ history }) => {
  const { voteIdParam, setUser } = useContext(GlobalContext);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => handleSignUp();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="nameContainer">
          <h4>First name</h4>
          <input
            name="fnameS"
            type="text"
            {...register("fnameS", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.fnameS && "First name is required"}
          <h4>Last name</h4>
          <input
            name="lnameS"
            type="text"
            {...register("lnameS", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.lnameS && "Last name is required"}
        </div>
        <div>
          <h4>Email</h4>
          <input
            name="emailS"
            type="email"
            {...register("emailS", { required: true })}
          />
          {errors.emailS && "email is required"}

          <h4>Password</h4>
          <input
            name="passwordS"
            type="password"
            {...register("passwordS", { required: true })}
          />
          <h4>Confirm Password</h4>
          <input
            name="confirmPwdS"
            type="password"
            {...register("confirmPwdS", {
              required: "Please confirm password!",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { passwordS } = getValues();
                  return passwordS === value || "Passwords should match!";
                },
              },
            })}
          />
          {errors.confirmPwdS && (
            <p style={{ color: "red" }}>{errors.confirmPwdS.message}</p>
          )}
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
