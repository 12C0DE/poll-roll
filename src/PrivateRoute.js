import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Firebase/Auth";

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/landing"} />
        )
      }
    />
  );
};
