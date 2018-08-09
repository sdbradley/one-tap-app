import React, { Component } from "react";
import { connect } from "react-redux";

class IntelligenceQuestions extends Component {
  constructor(props) {
    super(props);
    this.renderQuestion = this.renderQuestion.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.opportunity &&
          this.props.opportunity.intelligence_questions &&
          this.props.opportunity.intelligence_questions.map(
            this.renderQuestion
          )}
      </div>
    );
  }

  renderQuestion(question) {
    return (
      <div
        className="Widget-full IntelligenceQuestions-container"
        key={question.id}
      >
        <div className="Widget-half">
          <div className="IntelligenceQuestions-title">{question.question}</div>
        </div>
        <div className="Widget-half">
          <div className="IntelligenceQuestions-answer">
            {this.props.opportunity &&
              this.props.opportunity[
                `intelligence_question_${question.question_number}`
              ]}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  let user = state.authentication.user;
  return {
    user: user,
    opportunity: props.opportunity
  };
})(IntelligenceQuestions);
