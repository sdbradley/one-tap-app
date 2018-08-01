import React, { Component } from "react";
import ForcePasswordForm from "components/forms/ForcePasswordForm";
import App from "components/App";

class ForcePassword extends Component {
  render() {
    return (
      <App page="forgotPassword" showNav={false} minimal>
        <ForcePasswordForm />
      </App>
    );
  }
}

export default ForcePassword;
