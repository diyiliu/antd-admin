import React from "react";
import "antd/dist/antd.css";
import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./pages/login/Login";
import MainContainer from "./components/container/MainContainer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <MainContainer />
      </Switch>
    </Router>
  );
};

export default App;
