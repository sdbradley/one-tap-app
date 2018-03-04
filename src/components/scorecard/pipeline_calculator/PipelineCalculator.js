import React, { Component } from 'react';
import { connect } from 'react-redux';

class PipelineCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num_deals: 0,
      avg_deal_size: 0,
      total_deal_amount: 0
    };
  }

  componentDidMount() {
    this.calcTotals();
  }

  render() {
    return (
      <div>
        {this.props.data ?
          <div className="PipelineCalculator">
            <h3>Estimated Pipeline</h3>
            <div className="pipeline-calc-inner">
                <div className="PipelineCalculator-container">
                    <div className="left">Agreed to Next Steps:</div>
                    <div className="right calcValue">{this.state.num_deals}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="PipelineCalculator-container">
                    <div className="left">Average Deal Size:</div>
                    <div className="right calcValue">x {this.state.avg_deal_size}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="PipelineCalculator-container--equals"></div>
                <div className="PipelineCalculator-container--total">
                    <div className="left calcTotal">Total:</div>
                    <div className="right calcTotal">{this.state.num_deals * this.state.avg_deal_size}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="PipelineCalculator-footnote">* numbers based on information provided</div>
            </div>
          </div>
          : null
        }
      </div>
    );
  }

  calcTotals() {
    let totals = {
      num_deals: 0,
      avg_deal_size: 0,
      total_deal_amount: 0
    };
    this.props.data.forEach(item => {
      if ((item.stage_name === 'Next Steps Established') || (item.stage_name === 'On-Site Meeting Set') || (item.stage_name === 'Proposal/Price Quote')) {
        totals.total_deal_amount += item.amount;
        totals.num_deals++;
      }
    });
    if(totals.num_deals > 0) {
      totals.avg_deal_size = (totals.total_deal_amount / totals.num_deals)
    }
    this.setState(totals);
  }

}

export default connect(null, null)(PipelineCalculator)
