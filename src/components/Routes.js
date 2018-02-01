import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import RequireAuth from 'containers/require_auth';
import App from 'components/App';
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Dashboard from 'pages/dashboard';
import AdminDashboard from 'components/admin/dashboard';
import Scorecard from 'pages/scorecard';
import OpportunityDetails from 'pages/opportunity_detail';
import unauthed from 'components/higher_order_components/unauthed';

// An interface to add and remove route change handlers at runtime.
let updateHandlers = [];
export function onUpdate(cb) {
  updateHandlers.push(cb);
  return () => { updateHandlers = updateHandlers.filter(handler => handler !== cb) };
}

function update(state) {
  updateHandlers.forEach(handler => handler(state));
}

const ROUTES = (
  <Router history={hashHistory} onUpdate={update}>
    <Route path="/" component={RequireAuth}>
      {/* App */}
      <IndexRoute component={Dashboard}/>
      <Route path="scorecard" component={Scorecard} />

      <Route path="scorecard">
        <IndexRoute component={Scorecard}/>
        <Route path=':partner_id/opportunities' component={OpportunityDetails}/>
      </Route>

      {/* Admin */}
      <Route path="admin" component={App}>
        <IndexRoute component={AdminDashboard}/>
      </Route>

    </Route>

    {/* Public */}
    <Route path="/login" component={unauthed(Login)}/>
    <Route path="/forgot-password">
      <IndexRoute component={unauthed(ForgotPassword)}/>
      <Route path=':email/:token' component={unauthed(ResetPassword)}/>
    </Route>
  </Router>
);

export default function Routes() { return ROUTES; }
