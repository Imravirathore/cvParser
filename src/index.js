import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import AdminLayout from "layouts/Admin.js";
import Home from "Home";
import SignIn from "views/SignIn";
import SignUp from "views/SignUp";
import ProtectedRout from "components/Navbars/ProtectedRout";
// import Dashboard from "views/Dashboard.js";
// import UserProfile from "views/UserProfile.js";
// import Typography from "views/Typography.js";
// import MyResume from "views/MyResume";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <Home/>} />
      <Route path="/signin" render={(props) => <SignIn />} />
      <Route path="/signup" render={(props) => <SignUp />} />
      <Route path="/admin" render={(props) => <ProtectedRout Component={AdminLayout }/> } />
      {/* <Route path="/typography" render={(props) =>  <ProtectedRout Component={Typography }/>}/> */}
      {/*<Route path="/myResume" render={(props) =>  <ProtectedRout Component={MyResume }/>}/> */}
      {/*<Route path="/dashboard" render={(props) =>  <ProtectedRout Component={Dashboard }/>}/> */}
      {/* <Route path="/userProfile" render={(props) => <ProtectedRout Component={UserProfile }/>} />  */}
    </Switch>
  </Router>

  );