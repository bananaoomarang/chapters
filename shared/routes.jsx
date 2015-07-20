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

  // TODO Figure out a sane way of making onLeave handler a default....
  return (
    <Route component={Root} path="/">
      <Route name="home"         component={Home}        path="home"                 onLeave={onLeave} />
      <Route name="login"        component={Login}       path="login"                onLeave={onLeave} />
      <Route name="register"     component={Register}    path="register"             onLeave={onLeave} />
      <Route name="story"        component={Story}       path="/stories/:id"         onLeave={onLeave} />
      <Route name="new-story"    component={Story}       path="/stories/new"         onLeave={onLeave} />
      <Route name="users"        component={Users}       path="users"                onLeave={onLeave} />
      <Route name="user"         component={User}        path="/users/:user"         onLeave={onLeave} />
      <Route name="user-stories" component={UserStories} path="/users/:user/stories" onLeave={onLeave} />
    </Route>
  );
}
