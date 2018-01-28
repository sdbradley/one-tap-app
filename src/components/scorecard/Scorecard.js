import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scorecard extends Component {

  renderStageCount(stage) {
    if(this.props.opportunities) {
      return this.props.opportunities.findWhere({stage_name: stage}).length;
    }
    return 0;
  }
  renderTotalCount() {
    if(this.props.opportunities) {
      return this.props.opportunities.all().length;
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
                  <span className="BigStats-value" id="stats_total_prospecting">{this.renderStageCount("Upcoming")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Occurred</h4>
                  <span className="BigStats-value" id="stats_total_completed">{this.renderStageCount("Occurred")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Next Steps</h4>
                  <span className="BigStats-value" id="stats_total_nextsteps">{this.renderStageCount("Next Steps Established")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>On-site</h4>
                  <span className="BigStats-value" id="stats_total_onsite">{this.renderStageCount("On-Site Meeting Set")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Proposal</h4>
                  <span className="BigStats-value" id="stats_total_proposal">{this.renderStageCount("Proposal/Price Quote")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Deal Reg / Wins</h4>
                  <span className="BigStats-value" id="stats_total_closedwon">{this.renderStageCount("Closed Won")}</span>								
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
