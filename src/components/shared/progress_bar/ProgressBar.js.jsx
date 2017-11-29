import React, { Component } from 'react';
import './progress_bar.scss';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    let progressClass = "ProgressBar-progress";

    switch (this.props.curriculumTitle) {
      case "Foundations in Personal Finance":
        progressClass += " ProgressBar-progress--highSchool"
        break
      case "EntreLeadership for Teens":
        progressClass += " ProgressBar-progress--entre"
        break
      default:
        break
    }

    this.state = {
      progressClass: progressClass
    }
  }

  render() {
    return (
      <div className="ProgressBar">
        <span
          className={this.state.progressClass}
          style={{width: (this.props.progress + "%")}}></span> 
      </div>
    )
  }
}

export default ProgressBar;
