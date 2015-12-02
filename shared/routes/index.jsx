import React     from 'react';
import { Route } from 'react-router';

import Root        from 'components';
import Home        from 'components/Home';
import Login       from 'components/Login';
import Register    from 'components/Register';
import Users       from 'components/Users';
import User        from 'components/User';
import Story       from 'components/Story';
import NewStory    from 'components/Story/New';
import Section     from 'components/Section';
import Chapter     from 'components/Chapter';
import UserStories from 'components/Users/Stories';

export default function (onEnter) { 
    return (
      <Route component={Root} path="/">
        <Route name="home"         component={Home}        path="home"                 onEnter={onEnter} />
        <Route name="login"        component={Login}       path="/login"               onEnter={onEnter} />
        <Route name="register"     component={Register}    path="register"             onEnter={onEnter} />

        <Route name="new-story"    component={NewStory}    path="/stories/new"         onEnter={onEnter} />

        <Route name="new-chapter"  component={Chapter}     path="/chapters/new"        onEnter={onEnter} />
        <Route name="chapter"      component={Chapter}     path="/chapters/:id"        onEnter={onEnter} />

        <Route name="users"        component={Users}       path="users"                onEnter={onEnter} />
        <Route name="user"         component={User}        path="/users/:user"         onEnter={onEnter} />
        <Route name="user-stories" component={UserStories} path="/users/:user/stories" onEnter={onEnter} />
        <Route name="me"           component={User}        path="/me"                  onEnter={onEnter} />
      </Route>
  );
}
