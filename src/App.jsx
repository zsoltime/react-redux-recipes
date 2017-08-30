import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from 'About';
import Page from 'Page';
import Header from 'Header';

const routes = () => (
  <Router basename={'/'}>
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </Router>
);

export default routes;
