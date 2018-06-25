import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import { ROLE } from 'constants';
import ensureHasRole from 'components/higher_order_components/ensure_has_role';

import RequireAuth from 'containers/require_auth';
import App from 'components/App';
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Dashboard from 'pages/dashboard';
import AdminDashboard from 'components/admin/dashboard';
import StakeholderDashboard from 'components/stakeholder/dashboard';
import CampaignDashboard from 'components/campaigns/dashboard';
import Scorecard from 'pages/scorecard';
import Campaigns from 'pages/campaigns';
import Campaign from 'pages/campaign';
import Users from 'pages/users';
import Notifications from 'pages/notifications';
import OpportunityDetails from 'pages/opportunity_detail';
import Datasheet from 'pages/datasheet';
import Profile from 'pages/profile';
import unauthed from 'components/higher_order_components/unauthed';
import FetchUsers from 'containers/fetchers/fetch_users';
import FetchNotifications from 'containers/fetchers/fetch_notifications';

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
      <IndexRoute component={Campaigns}/>
      <Route path="scorecard" component={Scorecard} />

      <Route path="scorecard">
        <IndexRoute component={Scorecard}/>
        <Route path=':partner_id/opportunities' component={OpportunityDetails}/>
      </Route>

      <Route path="account/:accountId/opportunities/:opportunityId/datasheet">
        <IndexRoute component={Datasheet}/>
      </Route>

      <Route path="campaigns/:campaignId">
        <IndexRoute component={Campaign}/>
        <Route path="scorecard">
          <IndexRoute component={Scorecard}/>
        </Route>
      </Route>

      {/* Stakeholder */}
      <Route path="campaigns">
        <IndexRoute component={Campaigns}/>
      </Route>

      {/* User */}
      <Route path="profile" component={Profile} />

      {/* Admin */}
      <Route path="admin" component={ensureHasRole(ROLE.ADMIN, App)}>
        <IndexRoute component={AdminDashboard}/>
        <Route path="users" component={FetchUsers}>
          <IndexRoute component={Users}/>
        </Route>
        <Route path="notifications" component={FetchNotifications}>
          <IndexRoute component={Notifications}/>
        </Route>
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
