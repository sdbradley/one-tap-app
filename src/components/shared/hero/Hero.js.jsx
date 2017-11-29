import React, { Component } from 'react';
import "./hero.scss";

class Hero extends Component {
  render() {
    return(
      <div className={"Hero" + ((this.props.variant) ? ` Hero--${this.props.variant}` : "")}>
        <div className="Container">
          <h1 className="Hero-headline">{this.props.text}</h1>
        </div>
      </div>
    )
  }
}

export default Hero;
