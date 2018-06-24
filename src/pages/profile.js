import React from 'react';
import { connect } from 'react-redux';
import App from 'components/App';
import UserProfile from 'components/profile';

function UserProfilePage ({ user, ...props }) {
  return <App {...props}><UserProfile {...props} /></App>
}

const mapStateToProps = (state, props) => ({
  user: state.authentication.user
});

export default connect(mapStateToProps)(UserProfilePage);
