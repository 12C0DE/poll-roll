import React from "react";
import { Header } from "./Components/Header";
import { Landing } from "./Pages/Landing";
import { CreatePoll } from "./Pages/CreatePoll";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Results } from "./Pages/Results";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createPoll" component={CreatePoll} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/results" component={Results} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
