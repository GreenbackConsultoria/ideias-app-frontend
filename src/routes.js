import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Register from './pages/Register';

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Logon} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/login" exact component={Login} />

      </Switch>
    </BrowserRouter>
  )
}
