import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'containers/modal'
import Field from 'components/field'
import Button from 'components/shared/button/button'
import Form from 'components/Form'
import { setPassword } from 'actions/users'
import { closeModal } from 'actions/modal'

class SetPassword extends Component {
  constructor(props) {
    super(props)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.state = {
      success: false
    }
  }

  handleSuccess() {
    this.setState({
      success: true
    })
  }

  render() {
    return (
      <Modal>
        <div className="SetPassword">{this.renderContent()}</div>
      </Modal>
    )
  }

  renderContent() {
    if (this.state.success) {
      return this.renderMessage()
    }
    return this.renderForm()
  }

  renderMessage() {
    return (
      <div className="SetPassword-section">
        <h1 className="SetPassword-title">
          You have successfully reset your password.
        </h1>
        <Button onClick={this.props.closeModal}>OK</Button>
      </div>
    )
  }

  renderForm() {
    return (
      <Form
        className="SetPassword-section"
        onSubmit={this.props.setPassword}
        onSuccess={this.handleSuccess}
        errors={this.props.errors}
      >
        <h1 className="SetPassword-formTitle">Enter New Password</h1>
        <Field
          type="hidden"
          name="id"
          value={this.props.targetUser && this.props.targetUser.id}
        />
        <Field
          type="hidden"
          name="email_address"
          value={this.props.targetUser && this.props.targetUser.email}
        />
        <Field type="password" name="password" />
        <Button full submit>
          Change Password
        </Button>
      </Form>
    )
  }
}

export default connect(
  (state, props) => ({
    targetUser:
      (state.authentication.user.id === props.userId &&
        state.authentication.user) ||
      state.users.find(props.userId),
    authenticatedUserId: state.authentication.user.id
  }),
  { setPassword, closeModal }
)(SetPassword)
