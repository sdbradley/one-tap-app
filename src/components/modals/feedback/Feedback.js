import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'containers/modal';
import Form from 'components/Form';
import Field from 'components/field';
import Button from 'components/shared/button';
import { closeModal } from 'actions/modal';
import { leaveFeedback, LEAVE_FEEDBACK_SUCCESS } from 'actions/opportunities';

class Feedback extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (!this.props.opportunity) {
      return null;
    }
    return (
      <Modal closeAction={LEAVE_FEEDBACK_SUCCESS}>
          <div className='Feedback Feedback-form'>
            <p className='Feedback-title'>Leave Feedback for <strong>{this.props.opportunity.name}</strong></p>
            {this.renderForm()}
          </div>
      </Modal>
    );
  }

  renderForm() {
    return (
      <Form className='JoinClass-section' onSubmit={this.handleSubmit}>
        <h1 className='JoinClass-title'>Enter Feedback</h1>
        <Field
          type='text'
          name='feedback'
        />
        <Field type='hidden' name='opportunity_id' value={this.props.opportunity.id} />
        <Field type='hidden' name='feedback_type' value='Partner' />
        <Button full submit>Leave Feedback</Button>
      </Form>
    );
  }

  handleSubmit(data) {
    return this.props.leaveFeedback(data)
    .catch(errors => {
      throw new Error('Failed to leave feedback. Please try again.')
    });
  }
}

export default connect(
  (state, props) => ({ opportunity: state.opportunities.find(props.opportunityId, null) }),
  { leaveFeedback, closeModal }
)(Feedback);
