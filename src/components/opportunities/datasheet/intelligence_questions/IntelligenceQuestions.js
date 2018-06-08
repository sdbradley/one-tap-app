import React, { Component } from 'react';
import { connect } from 'react-redux';

class IntelligenceQuestions extends Component {

  render() {
    return (
      <div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">How many terabytes do they currently manage?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_001}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Current storage vendor?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_002}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Current storage solution (SAN, NAS, Direct Attached)?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_003}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Virtualization platform (VMware, Hyper-V or Citrix)?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_004}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Do you have any prior experience working with Dell EMC Flash Storage? If so, what?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_005}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Anticipated data growth (terabytes) next year?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_006}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Disaster Recovery: current and future plans?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_007}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">How are they currently backing up their information?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_008}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Prospect's title and decision-making capabilities?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_009}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">When will funding be available? Budgetary Cycle?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_010}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Main initiatives for the project?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_011}</div>
          </div>
        </div>
        <div className="Widget-full IntelligenceQuestions-container">
          <div className="Widget-half">
            <div className="IntelligenceQuestions-title">Any other IT initatives within the next 6-12 months?</div>
          </div>
          <div className="Widget-half">
            <div className="IntelligenceQuestions-answer">{this.props.opportunity && this.props.opportunity.intelligence_question_012}</div>
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
        user: user,
        opportunity: props.opportunity
    };
  }
)(IntelligenceQuestions);
