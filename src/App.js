import React from "react";
import "antd/dist/antd.css";

import { Spin } from "antd";
import "./App.scss";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainContainer from "./components/container/MainContainer";

import { getToken } from "utils/auth";

const Login = React.lazy(() => import("./pages/login/Login"));

const loading = () => (
  <div className="loading">
    <Spin />
  </div>
);

const AuthRoute = ({ component, ...rest }) => {
  const token = getToken();
  
  if (token) {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <AuthRoute path="/" component={MainContainer} />
        </Switch>
      </React.Suspense>
    </Router>
  );
};

export default App;
