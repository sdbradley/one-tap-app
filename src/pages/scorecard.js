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

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(Scorecard);
