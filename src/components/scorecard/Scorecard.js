import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scorecard extends Component {

  renderCount(stage) {
    if(this.props.data && this.props.data.length > 0) {
      return this.props.data.map(item => item[stage]).reduce((prev, next) => prev + next);
    }
    return 0;
  }
  renderTotalCount() {
    if(this.props.data && this.props.data.length > 0) {
      let prospecting = this.renderCount("prospecting");
      let completed = this.renderCount("completed");
      let nextsteps = this.renderCount("nextsteps");
      let onsite = this.renderCount("onsite");
      let proposal = this.renderCount("proposal");
      let closedwon = this.renderCount("closedwon");
      return (prospecting + completed + nextsteps + onsite + proposal + closedwon);
    }
    return 0;
  }
  render() {
    return (
      <div>
        <div className="Widget-full">
          <div className="widget BigStats-container stacked">
                <div className="widget-content">
                  <div className="BigStats">
                <div className="BigStats-stat">								
                  <h4>Upcoming</h4>
                  <span className="BigStats-value" id="stats_total_prospecting">{this.renderCount("prospecting")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Occurred</h4>
                  <span className="BigStats-value" id="stats_total_completed">{this.renderCount("completed")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Next Steps</h4>
                  <span className="BigStats-value" id="stats_total_nextsteps">{this.renderCount("nextsteps")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>On-site</h4>
                  <span className="BigStats-value" id="stats_total_onsite">{this.renderCount("onsite")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Proposal</h4>
                  <span className="BigStats-value" id="stats_total_proposal">{this.renderCount("proposal")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Deal Reg / Wins</h4>
                  <span className="BigStats-value" id="stats_total_closedwon">{this.renderCount("closedwon")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Total</h4>
                  <span className="BigStats-value" id="stats_total_all">{this.renderTotalCount()}</span>								
                </div>
              </div>
              
            </div>
              
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let accountId = user && user.accountId;
    return {
      partner_id: accountId
    };
  }
)(Scorecard);
