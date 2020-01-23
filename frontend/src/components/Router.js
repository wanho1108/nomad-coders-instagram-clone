import PropTypes from 'prop-types';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/auth/';
import Feed from '../routes/Feed';

const LoggedInRoutes = () => <><Route exact path="/" component={Feed} /></>;
const LoggedOutRoutes = () => <><Route exact path="/" component={Auth} /></>;

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Switch>{ isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> }</Switch>
  </Router>
);

AppRouter.protoTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;