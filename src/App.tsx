import React, { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
// import your fontawesome library
import './fontawesome';
import './assets/css/customstyle.css';

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Step2 = lazy(() => import("./pages/Login/Step2"));
const KodeRegistrasi = lazy(() => import("./pages/Registration/CodeRegister"));
const CreateAccount = lazy(() => import("./pages/Registration/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/Registration/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/step-2-login" component={Step2} />
          <Route path="/kode-registrasi" component={KodeRegistrasi} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          {/* <Redirect exact from="/" to="/login" /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
