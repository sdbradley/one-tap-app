import React, { Component } from 'react';
import { connect } from 'react-redux';
import Widget from 'components/widget';
import Link from 'components/link';
import Button from 'components/shared/button/button';

class UserProfile extends Component {

  renderName() {
    if (this.props.user) {
      return `${this.props.user.firstName} ${this.props.user.lastName}`
    }
  }
  render() {
    return (
      <div>
        <div className="Widget-full">
          <div className="Widget-half">
            <Widget title="My Profile">
              {this.renderName()}
            </Widget>
          </div>
        </div>
        <div className="Widget-full">
          <div className="Widget-half">
            <Widget title="Email Address">
              {this.props.user && this.props.user.email}
            </Widget>
          </div>
        </div>
        <div className="Widget-full">
          <div className="Widget-half">
            <Widget title="Change Password">
              <Link blue modal="setPassword" userId={this.props.user.id}>
                <Button className="UserProfile-field">Change Password</Button>
              </Link>
            </Widget>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    return {
      user: user
    };
  }
)(UserProfile);
