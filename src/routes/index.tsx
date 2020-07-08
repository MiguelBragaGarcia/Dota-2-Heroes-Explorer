import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Hero from '../pages/Hero';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/hero/:id+" exact component={Hero} />
  </Switch>
);

export default Routes;
