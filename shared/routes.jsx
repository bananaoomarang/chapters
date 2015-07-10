import React            from 'react';
import { Route }        from 'react-router';
import { DefaultRoute } from 'react-router';

import Root        from 'views';
import Home        from 'views/Home';
import Login       from 'views/Login';
import Register    from 'views/Register';
import Users       from 'views/Users';
import User        from 'views/User';
import Story       from 'views/Story';
import UserStories from 'views/Users/Stories';

export default (
  <Route handler={Root}>
    <DefaultRoute handler={Home} />

    <Route name="home"         handler={Home}                                    />
    <Route name="login"        handler={Login}                                   />
    <Route name="register"     handler={Register}                                />
    <Route name="story"        handler={Story}       path="/stories/:id"         />
    <Route name="users"        handler={Users}                                   />
    <Route name="user"         handler={User}        path="/users/:user"         />
    <Route name="user-stories" handler={UserStories} path="/users/:user/stories" />
  </Route>
);
