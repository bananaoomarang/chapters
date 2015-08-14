import React                    from 'react';
import { Route, NotFoundRoute } from 'react-router';

import Root        from 'components';
import Home        from 'components/Home';
import Login       from 'components/Login';
import Register    from 'components/Register';
import Users       from 'components/Users';
import User        from 'components/User';
import Story       from 'components/Story';
import NewStory    from 'components/Story/New';
import Section     from 'components/Section';
import NewSection  from 'components/Section/New';
import Chapter     from 'components/Chapter';
import UserStories from 'components/Users/Stories';

export default function getRoutes(onLeave) {

  // TODO Figure out a sane way of making onLeave handler a default....
  return (
    <Route component={Root} path="/">
      <Route name="home"          component={Home}        path="home"                           onLeave={onLeave} />
      <Route name="login"         component={Login}       path="login"                          onLeave={onLeave} />
      <Route name="register"      component={Register}    path="register"                       onLeave={onLeave} />

      <Route name="new-story"     component={NewStory}    path="/stories/new"                   onLeave={onLeave} />
      <Route name="story"         component={Story}       path="/stories/:id"                   onLeave={onLeave} />

      <Route name="new-section"   component={NewSection}  path="/stories/:id/new"               onLeave={onLeave} />
      <Route name="section"       component={Section}     path="/stories/:id/:section"          onLeave={onLeave} />

      <Route name="new-chapter"   component={Chapter}     path="/stories/:id/:section/new"      onLeave={onLeave} />
      <Route name="chapter"       component={Chapter}     path="/stories/:id/:section/:chapter" onLeave={onLeave} />

      <Route name="users"         component={Users}       path="users"                          onLeave={onLeave} />
      <Route name="user"          component={User}        path="/users/:user"                   onLeave={onLeave} />
      <Route name="user-chapters" component={UserStories} path="/users/:user/chapters"          onLeave={onLeave} />
    </Route>
  );
}
