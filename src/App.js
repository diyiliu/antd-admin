import React from "react";
import "antd/dist/antd.css";
import "./App.scss";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <MainLayout />
      </Switch>
    </Router>
  );
};

export default App;
