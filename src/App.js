import React from "react";
import { Header } from "./Components/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreatePoll from "./Pages/CreatePoll";
import { EditPolls2 } from "./Pages/EditPolls2";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Results } from "./Pages/Results";
import { ResultsAll } from "./Pages/ResultsAll";
import Voting from "./Pages/Voting";
import { VoteAt } from "./Pages/VoteAt";
import { PrivateRoute } from "./PrivateRoute";
import { GlobalProvider } from "./Context/GlobalState";
import { AuthProvider } from "./Firebase/Auth";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./styles/main.css";

function App() {
  return (
    <GlobalProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <PrivateRoute exact path="/home/:aid" component={Home} />
            <Route exact path="/createPoll" component={CreatePoll} />
            <Route exact path="/editPoll/:_id/:authId" component={EditPolls2} />
            <Route
              exact
              path={["/login", "/", "/login/:pollId"]}
              component={Login}
            />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/results/poll/:_id" component={Results} />
            <Route exact path="/results/:aid" component={ResultsAll} />
            <Route exact path="/voteat/:pollId" component={VoteAt} />
            <Route exact path="/voting/:_id" component={Voting} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
