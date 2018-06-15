import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import PartnerScorecard from 'components/scorecard/partner';
import { RIGHT } from 'constants';

function Scorecard ({ user, ...props }) {
  let content = null;
  if (user.hasRight(RIGHT.ADMIN_DASHBOARD)) {
    content = <PartnerScorecard {...props} />;
  } else {
    content = <PartnerScorecard {...props} />;
  }

  return <App {...props}>{content}</App>
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    let campaignId = props.params.campaignId;
    return {
      user: user,
      partner_id: accountId,
      campaignId: campaignId
    };
  }
)(Scorecard);
