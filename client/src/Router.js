import React, { Suspense, lazy } from "react";
import Launches from "./components/Launches";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...?</div>}>
        <Switch>
          <>
            <div className="container">
              <Route exact path="/" component={Launches} />
              <Route exact path="/launch/:flight_number" component={Launch} />
            </div>
          </>
        </Switch>
      </Suspense>
    </Router>
  );
};
