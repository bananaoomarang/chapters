import React     from 'react';
import { Route } from 'react-router';

import Root        from 'components';
import Home        from 'components/Home';
import Login       from 'components/Login';
import Register    from 'components/Register';
import Users       from 'components/Users';
import User        from 'components/User';
import Story       from 'components/Story';
import Section     from 'components/Section';
import Chapter     from 'components/Chapter';
import UserStories from 'components/Users/Stories';

export default (
  <Route component={Root} path="/">
    <Route name="home"         component={Home}        path="home"                 />
    <Route name="login"        component={Login}       path="/login"                />
    <Route name="register"     component={Register}    path="register"             />

    <Route name="new-chapter"  component={Chapter}     path="/chapters/new"        />
    <Route name="chapter"      component={Chapter}     path="/chapters/:id"        />

    <Route name="users"        component={Users}       path="users"                />
    <Route name="user"         component={User}        path="/users/:user"         />
    <Route name="user-stories" component={UserStories} path="/users/:user/stories" />
    <Route name="me"           component={User}        path="/me"                  />
  </Route>
);
