import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import PartnerOpportunities from 'components/opportunities/partner';

function OpportunityDetail ({ user, ...props }) {
  return <App {...props}><PartnerOpportunities {...props} /></App>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(OpportunityDetail);
