import React, { Component } from 'react';
import './card.scss';

import Button from "../button/button.js.jsx";

class RegistrationCard extends Component {
  constructor(props) {
    super(props);

    this._handleInputChange = this._handleInputChange.bind(this);

    this.state = {
      classCode: ""
    }
  }

  render() {
    return (
      <div className="Card Card--withHint">
        <div className="Card-contentContainer">
          <h2 className="Card-title">Enter Class Code</h2>
          <input type="text" className="Card-textInput" name="classCode" value={this.state.classCode} onChange={this._handleInputChange}></input>
          <Button full buttonText={this.props.buttonText} onClick={this.props.onClick}/>
        </div>
        <div className="Card-hint">
          <h3 className="Card-hintTitle">No Code?</h3>
          <p className="Card-hintText">Your teacher will provide you with a class code. If you don't
            have a class code, please contact your teacher to get one.</p>
        </div>
      </div>
    );
  }

  _handleInputChange(e) {
    let classCode = e.target.value;

    this.setState((prevState, props) => {
      return {
        classCode: classCode
      }
    });
  }
}

export default RegistrationCard;
