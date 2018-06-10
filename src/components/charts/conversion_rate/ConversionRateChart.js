import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CirclePie} from 'react-simple-charts'
import jinqJs from 'jinq';
import { STAGE } from 'constants';

class ConversionRateChart extends Component {

  getScorecardData(){
    var result = new jinqJs()
    .from(this.props.data)
    .distinct("partner__c", "name")
    .select();
    return result;
  }
  getScorecardClosedWon(partner__c) {
    return this.getScorecardValue(partner__c, STAGE.CLOSED);
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
  render() {
    return (
      <div>
        {this.props.data
          ? this.getScorecardData().map(item => <div key={item.id} className="ConversionRateChart-container"><CirclePie percent={this.getScorecardClosedWon(item.partner__c)}/><h3>{item.account}</h3></div>)
          : null
        }
      </div>
    );
  }
}

export default connect(null, null)(ConversionRateChart)
