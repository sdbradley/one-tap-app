import React, { Component } from "react";
import { connect } from "react-redux";
import { setCampaign } from "actions/navigation";
import { STAGE } from "constants";

class Scorecard extends Component {
  componentDidMount() {
    if (this.props.campaignId) {
      this.props.dispatch(setCampaign(this.props.campaignId));
    }
  }

  renderCount(stage) {
    let total = 0;
    if (this.props.data && this.props.data.length > 0) {
      let f = this.props.data.filter(item => item.stage_name === stage);
      f.forEach(item => {
        total += item.total;
      });
    }
    return total;
  }
  renderTotalCount() {
    if (this.props.data && this.props.data.length > 0) {
      let prospecting = this.renderCount(STAGE.UPCOMING);
      let completed = this.renderCount(STAGE.OCCURRED);
      let nextsteps = this.renderCount(STAGE.NEXT_STEPS);
      let onsite = this.renderCount(STAGE.ON_SITE);
      let proposal = this.renderCount(STAGE.PROPOSAL);
      let closedwon = this.renderCount(STAGE.CLOSED);
      return (
        prospecting + completed + nextsteps + onsite + proposal + closedwon
      );
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
                  <span className="BigStats-value" id="stats_total_prospecting">
                    {this.renderCount(STAGE.UPCOMING)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>Occurred</h4>
                  <span className="BigStats-value" id="stats_total_completed">
                    {this.renderCount(STAGE.OCCURRED)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>Next Steps</h4>
                  <span className="BigStats-value" id="stats_total_nextsteps">
                    {this.renderCount(STAGE.NEXT_STEPS)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>On-site</h4>
                  <span className="BigStats-value" id="stats_total_onsite">
                    {this.renderCount(STAGE.ON_SITE)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>Proposal</h4>
                  <span className="BigStats-value" id="stats_total_proposal">
                    {this.renderCount(STAGE.PROPOSAL)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>Deal Reg / Wins</h4>
                  <span className="BigStats-value" id="stats_total_closedwon">
                    {this.renderCount(STAGE.CLOSED)}
                  </span>
                </div>

                <div className="BigStats-stat">
                  <h4>Total</h4>
                  <span className="BigStats-value" id="stats_total_all">
                    {this.renderTotalCount()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  let user = state.authentication.user;
  let accountId = user && user.accountId;
  let campaignId = props.campaignId;
  return {
    partner_id: accountId,
    campaignId: campaignId
  };
})(Scorecard);
