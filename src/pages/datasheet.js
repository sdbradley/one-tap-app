import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import OpportunityDatasheet from 'components/opportunities/datasheet';

function Datasheet ({ user, ...props }) {
  return <App {...props}><OpportunityDatasheet {...props} /></App>
}

const mapStateToProps = (state) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(Datasheet);
