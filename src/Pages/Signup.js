import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../Firebase/firebase";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";

const Signup = ({ history }) => {
  const { voteIdParam, setUser } = useContext(GlobalContext);
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    const { emailS, passwordS, confirmPwdS, fnameS, lnameS } = data;

    if (passwordS !== confirmPwdS) {
      alert("Password does not match");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(emailS, passwordS).then(() => {
        const newUser = {
          fname: fnameS,
          lname: lnameS,
          authId: auth.currentUser.uid,
          email: emailS,
        };

        axios
          .post("https://pollroll-api.herokuapp.com/users/post", newUser)
          .then((user) => {
            setUser(user.data);

            voteIdParam
              ? history.push(`/voting/${voteIdParam}`)
              : history.push(`/home/${auth.currentUser.uid}`);
          });
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-center py-8">Sign up</h1>
      </div>
      <Container maxWidth="lg">
        <div className="flex place-content-center">
          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col no-wrap items-center"
          >
            <Stack spacing={4}>
              <TextField
                name="fnameS"
                label="First Name"
                variant="outlined"
                error={errors.fnameS}
                className="w-full max-w-md"
                helperText={errors.fnameS && "Valid first name is required"}
                {...register("fnameS", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <TextField
                name="lnameS"
                label="Last Name"
                variant="outlined"
                error={errors.lnameS}
                helperText={errors.lnameS && "Valid last name is required"}
                {...register("lnameS", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <TextField
                name="emailS"
                label="Email"
                variant="outlined"
                error={errors.emailS}
                type="email"
                helperText={errors.emailS && "Valid email is required"}
                {...register("emailS", { required: true })}
              />
              <TextField
                name="passwordS"
                label="Password"
                variant="outlined"
                type="password"
                error={errors.passwordS}
                helperText={errors.passwordS && "Password is required"}
                {...register("passwordS", { required: true })}
              />
              <TextField
                name="confirmPwdS"
                label="Confirm Password"
                variant="outlined"
                type="password"
                error={errors.confirmPwdS}
                helperText={errors.confirmPwdS && errors.confirmPwdS.message}
                {...register("confirmPwdS", {
                  required: "Please confirm password!",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { passwordS } = getValues();
                      return passwordS === value || "Passwords don't match";
                    },
                  },
                })}
              />
              <Button
                variant="contained"
                type="submit"
                className="place-self-center"
                style={{ width: 250 }}
              >
                Sign Up
              </Button>
              <div>
                <h3>
                  Already have an account?
                  <Link
                    className="px-2"
                    style={{
                      textDecoration: "underline",
                      color: "#27A6F9",
                    }}
                    to="/login"
                  >
                    Log in
                  </Link>
                  here
                </h3>
              </div>
            </Stack>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(Signup);
