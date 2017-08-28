import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import About from 'About';
import Page from 'Page';
import 'styles';

const routes = () => (
  <Router basename={'/'}>
    <div className="wrapper">
      <Route exact path="/" component={Page} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

export default routes;
