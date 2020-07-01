import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Hero from '../pages/Hero';

interface HeroData {
  id: number;
  localized_name: string;
  primary_attr: string;
  img: string;
  base_str: number;
  base_agi: number;
  base_int: number;

  str_gain: number;
  agi_gain: number;
  int_gain: number;
}

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/hero/:id+" exact component={Hero} />
  </Switch>
);

export default Routes;
