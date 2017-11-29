import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'containers/modal';
import Button from 'components/shared/button/button';
import Form from 'components/Form';
import moment from 'moment';
import { AUTHENTICATION_STAY_LOGGED_IN, stayLoggedIn, currentUserLogout } from 'actions/authentication';
import { INACTIVITY_WARNING_DURATION } from 'constants';

class InactivityWarning extends Component {
  constructor(props) {
    super(props);
    this.stopPropagation = e => e.stopPropagation();
    this.update = this.update.bind(this);
    this.finish = moment().add(INACTIVITY_WARNING_DURATION, 's');
    this.state = {
      timeLeft: 'in 30 seconds'
    };
  }

  update() {
    let timeLeft = `in ${Math.max(this.finish.diff(moment(), 's'), 0)} seconds`;
    if (timeLeft !== this.state.timeLeft) {
      this.setState({ timeLeft })
    }
    
  }

  componentWillMount() {
    this.interval = setInterval(this.update, 10)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    return (
      <Modal closeAction={AUTHENTICATION_STAY_LOGGED_IN} onMouseDown={this.stopPropagation} onClose={this.props.stayLoggedIn}>
        <div className='InactivityWarning'>
          <Form className='InactivityWarning-section' onSubmit={this.props.stayLoggedIn}>
            <h1 className='InactivityWarning-title'>Are you still there?</h1>
            <p className='InactivityWarning-info'>You will be logged out automatically <br/> {this.state.timeLeft}.</p>
            <Button className='InactivityWarning-button' inverse onClick={this.props.currentUserLogout}>Logout</Button>
            <Button className='InactivityWarning-button' submit>Stay Logged In</Button>
          </Form>
        </div>
      </Modal>
    );
  }
}

export default connect(
  (state, props) => ({ student: state.users.find(props.userId) }),
  { stayLoggedIn, currentUserLogout }
)(InactivityWarning);
