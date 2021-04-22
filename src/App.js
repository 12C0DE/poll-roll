import React from "react";
import { Header } from "./Components/Header";
import { Landing } from "./Pages/Landing";
import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
import { CreatePoll } from "./Pages/CreatePoll";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Results } from "./Pages/Results";
import { GlobalProvider } from "./Context/GlobalState";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/createPoll" component={CreatePoll} />
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup" component={Signup} /> */}
          <Route exact path="/results" component={Results} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/landing" />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
