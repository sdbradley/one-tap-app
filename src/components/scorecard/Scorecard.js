import React, { Component } from 'react';
import { connect } from 'react-redux';

class Scorecard extends Component {

  renderCount(stage) {
    if(this.props.data && this.props.data.length > 0) {
      let f = this.props.data.filter(item => item.stage_name===stage);
      if(f.length > 0)
        return f[0].total;
      else
        return 0;
    }
    return 0;
  }
  renderTotalCount() {
    if(this.props.data && this.props.data.length > 0) {
      let prospecting = this.renderCount("Upcoming");
      let completed = this.renderCount("Occurred");
      let nextsteps = this.renderCount("Next Steps Established");
      let onsite = this.renderCount("On-Site Meeting Set");
      let proposal = this.renderCount("Proposal/Price Quote");
      let closedwon = this.renderCount("Closed Won");
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
                  <span className="BigStats-value" id="stats_total_prospecting">{this.renderCount("Upcoming")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Occurred</h4>
                  <span className="BigStats-value" id="stats_total_completed">{this.renderCount("Occurred")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Next Steps</h4>
                  <span className="BigStats-value" id="stats_total_nextsteps">{this.renderCount("Next Steps Established")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>On-site</h4>
                  <span className="BigStats-value" id="stats_total_onsite">{this.renderCount("On-Site Meeting Set")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Proposal</h4>
                  <span className="BigStats-value" id="stats_total_proposal">{this.renderCount("Proposal/Price Quote")}</span>								
                </div>
                  
                <div className="BigStats-stat">								
                  <h4>Deal Reg / Wins</h4>
                  <span className="BigStats-value" id="stats_total_closedwon">{this.renderCount("Closed Won")}</span>								
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
