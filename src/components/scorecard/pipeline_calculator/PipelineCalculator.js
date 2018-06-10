import React, { Component } from 'react';
import { connect } from 'react-redux';
import jinqJs from 'jinq';
import { STAGE } from 'constants';

class PipelineCalculator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num_deals: 0,
      avg_deal_size: 0,
      total_deal_amount: 0
    };
  }

  componentWillReceiveProps() {
    this.calcTotals();
  }

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

  renderAvgDealSize() {
    return (
      <span>{`x ${new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 }).format(this.state.avg_deal_size)}`}</span>
    )
  }
  renderTotal() {
    return (
      <span>{`${new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 }).format(this.state.num_deals * this.state.avg_deal_size)}`}</span>
    )
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
                    <div className="right calcValue">{this.renderCount(STAGE.NEXT_STEPS)}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="PipelineCalculator-container">
                    <div className="left">Average Deal Size:</div>
                    <div className="right calcValue">{this.renderAvgDealSize()}</div>
                    <div className="clearfix"></div>
                </div>
                <div className="PipelineCalculator-container--equals"></div>
                <div className="PipelineCalculator-container--total">
                    <div className="left calcTotal">Total:</div>
                    <div className="right calcTotal">{this.renderTotal()}</div>
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

  getScorecardData(){
    var result = new jinqJs()
    .from(this.props.data)
    .distinct("partner__c", "name")
    .select();
    return result;
  }
  getScorecardNextSteps(partner__c) {
    return this.getScorecardValue(partner__c, STAGE.NEXT_STEPS);
  }
  getScorecardValue(partner__c, key){
    var result = new jinqJs()
    .from(this.props.data)
    .distinct("partner__c", "stage_name", "total")
    .where(function(row, index) {
      return (row.stage_name === key && row.partner__c === partner__c); 
    })
    .select();
    return (result[0] ? result[0].total : 0);
  }
  
  calcTotals() {
    let totals = {
      num_deals: 0,
      avg_deal_size: 0,
      total_deal_amount: 0
    };
    totals.num_deals = this.renderCount(STAGE.NEXT_STEPS);
    this.props.opportunities.forEach(item => {
      if (item.amount) {
        totals.total_deal_amount += parseInt(item.amount);
      }
    });
    if(totals.num_deals > 0) {
      totals.avg_deal_size = (totals.total_deal_amount / totals.num_deals)
    }
    this.setState(totals);
  }
}

export default connect(null, null)(PipelineCalculator)
