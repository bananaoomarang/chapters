import React              from 'react';
import { Route }          from 'react-router';

import Root        from 'views';
import Home        from 'views/Home';
import Login       from 'views/Login';
import Register    from 'views/Register';
import Users       from 'views/Users';
import User        from 'views/User';
import Story       from 'views/Story';
import UserStories from 'views/Users/Stories';

export default function getRoutes(onLeave) {

  return (
    <Route component={Root} path="/">
      <Route name="home"         component={Home}        path="home"                 onLeave={onLeave} />
      <Route name="login"        component={Login}       path="login"                                  />
      <Route name="register"     component={Register}    path="register"                               />
      <Route name="story"        component={Story}       path="/stories/:id"         onLeave={onLeave} />
      <Route name="users"        component={Users}       path="users"                                  />
      <Route name="user"         component={User}        path="/users/:user"                           />
      <Route name="user-stories" component={UserStories} path="/users/:user/stories"                   />
    </Route>
  );
}
