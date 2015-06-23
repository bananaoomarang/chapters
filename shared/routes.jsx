import React            from 'react';
import { Route }        from 'react-router';
import { DefaultRoute } from 'react-router';

import MainView    from './views/MainView';
import Home        from './views/Home';
import Login       from './views/Login';
import Register    from './views/Register';
import Editor      from './views/Editor';
import Users       from './views/Users';
import User        from './views/User';
import Story       from './views/Story';
import UserStories from './views/Users/Stories';

export default (
  <Route handler={MainView}>
    <DefaultRoute handler={Home} />

    <Route name="home"         handler={Home}                                    />
    <Route name="login"        handler={Login}                                   />
    <Route name="register"     handler={Register}                                />
    <Route name="editor"       handler={Editor}                                  />
    <Route name="users"        handler={Users}                                   />
    <Route name="user"         handler={User}        path="/users/:user"         />
    <Route name="user-stories" handler={UserStories} path="/users/:user/stories" />
    <Route name="story"        handler={Story}       path="/stories/:id"         />
  </Route>
);
