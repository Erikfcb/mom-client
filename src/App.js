import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddForm from "./AddForm";
import Home from "./Home";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/add" exact component={AddForm} />
      </Switch>
    </Router>
  );
}

export default App;
