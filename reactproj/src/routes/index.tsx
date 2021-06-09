import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

import Dashboard from '../Pages/Dashboard';
import New from '../Pages/New';
import Details from '../Pages/Details';
import Att from '../Pages/Att';


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/new" component={New} isPrivate />
    <Route path="/details/:professor" component={Details} isPrivate />
    <Route path="/att/:professor" component={Att} isPrivate />

  </Switch>
);

export default Routes;
