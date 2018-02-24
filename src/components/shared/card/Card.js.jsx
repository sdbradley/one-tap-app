import React, { Component } from 'react';
import './card.scss';

import Button from "components/shared/button";
import ProgressBar from "../progress_bar/ProgressBar.js.jsx";

class Card extends Component {
  constructor(props) {
    super(props);
    let buttonText;

    if (this.props.buttonText) {
      buttonText = this.props.buttonText;
    } else {
      buttonText = (this.props.progress && this.props.progress === "0") ? "Start" : "Continue";
    }

    let cardClassName = (this.props.isAdmin) ? "Card Card--admin" : "Card"

    this.state = {
      buttonText: buttonText,
      cardClassName: cardClassName
    }
  }

  render() {
    return (
      <div className={this.state.cardClassName}>
        {this.props.progress &&
          <ProgressBar
            progress={this.props.progress}
            curriculumTitle={this.props.title}/>
        }
        <div className="Card-container">
          <h2 className="Card-title">{this.props.title}</h2>
          <div className="Card-info">
            <span className="Card-infoItem">{this.props.infoLine1}</span>
            <span className="Card-infoItem">{this.props.infoLine2}</span>
          </div>
          <Button classOverride={this.props.classOverride} buttonText={this.state.buttonText} onClick={this.props.onClick}/>
          {this.props.sponsoredBy &&
            <div className="Card-sponsoredBy">
              <span>Sponsored By</span>
              {this.props.sponsorLogo &&
                <img className="Card-sponsorLogo" src={this.props.sponsorLogo} alt={this.props.sponsoredBy} />}
            </div>
          }
          {this.props.completedPercent &&
            <div className="Card-sponsoredBy">
              <span>{this.props.completedPercent}</span>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Card;
