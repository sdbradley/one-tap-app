import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "components/image";
import { forgotPassword, newAuthForm } from "actions/authentication";

import "./login_form.scss";

class ForcePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: ""
    };
  }

  componentWillMount() {
    this.props.newAuthForm();
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value
    });
  }

  render() {
    return <div className="LoginForm">{this.renderEmailSent()}</div>;
  }

  renderEmailSent() {
    return (
      <div>
        <div className="LoginForm--logoContainer">
          <Image
            image={`https://s3.amazonaws.com/test.1tap.ontappipeline.com/cdn/images/otp-logo.png`}
            className="LoginForm--logo"
            title={`1Tap logo`}
          />
        </div>
        <div className="LoginForm-section">
          <p className="LoginForm-helpText uppercase">
            We've improved our security
          </p>
          <h1 className="LoginForm-heading">Please update your password.</h1>
          <p className="LoginForm-helpText">
            We just emailed you password reset instructions.
          </p>
          <p className="LoginForm-helpText">
            If you don't receive an email in the next few minutes, please
            Contact our Support team at{" "}
            <span className="bold">help@ontappipeline.com</span>.
          </p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    errors: state.authentication.authFormErrors.toJS(),
    success: state.authentication.authFormSuccess,
    processing: state.authentication.processing
  }),
  { forgotPassword, newAuthForm }
)(ForcePasswordForm);
