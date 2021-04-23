import React from "react";
import { Header } from "./Components/Header";
import { Logout } from "./Components/Logout";
import { Landing } from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { CreatePoll } from "./Pages/CreatePoll";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Results } from "./Pages/Results";
import { PrivateRoute } from "./PrivateRoute";
import { GlobalProvider } from "./Context/GlobalState";
import { AuthProvider } from "./Firebase/Auth";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Logout />
          <Header />
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/createPoll" component={CreatePoll} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/results" component={Results} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/landing" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
