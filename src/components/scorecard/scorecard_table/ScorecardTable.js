import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Link from 'components/link';
import jinqJs from 'jinq';
import { APP_ROOT } from 'constants';
import { STAGE } from 'constants';

class ScorecardTable extends Component {

  constructor(props) {
    super(props);
    this.getScorecardValue = this.getScorecardValue.bind(this);
    this.getScorecardData = this.getScorecardData.bind(this);
    this.getScorecardUpcoming = this.getScorecardUpcoming.bind(this);
    this.getScorecardOccurred = this.getScorecardOccurred.bind(this);
    this.getScorecardNextStepsEstablished = this.getScorecardNextStepsEstablished.bind(this);
    this.getScorecardOnSiteMeetingSet = this.getScorecardOnSiteMeetingSet.bind(this);
    this.getScorecardProposalPriceQuote = this.getScorecardProposalPriceQuote.bind(this);
    this.getScorecardClosedWon = this.getScorecardClosedWon.bind(this);
  }

  render() {
      return (
        <div className="ScorecardTable">
          <Table className="ScorecardTable-table"
            columns={[
              { name: 'Partner', property: 'account', renderer: this.renderAccount },
              { name: 'Upcoming', property: 'account', renderer: this.getScorecardUpcoming},
              { name: 'Occurred', property: 'account', renderer: this.getScorecardOccurred},
              { name: 'Next Steps', property: 'account', renderer: this.getScorecardNextStepsEstablished},
              { name: 'On-Site', property: 'account', renderer: this.getScorecardOnSiteMeetingSet},
              { name: 'Proposal', property: 'account', renderer: this.getScorecardProposalPriceQuote},
              { name: 'Closed Won', property: 'account', renderer: this.getScorecardClosedWon},
              { name: 'Total', property: 'account'}
            ]}
            data={this.getScorecardData()}
            emptyState='No results'
          />
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
    getScorecardUpcoming(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.UPCOMING}`}>{this.getScorecardValue(account.partner__c, STAGE.UPCOMING)}</Link>;
    }
    getScorecardOccurred(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.OCCURRED}`}>{this.getScorecardValue(account.partner__c, STAGE.OCCURRED)}</Link>;
    }
    getScorecardNextStepsEstablished(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.NEXT_STEPS}`}>{this.getScorecardValue(account.partner__c, STAGE.NEXT_STEPS)}</Link>;
    }
    getScorecardOnSiteMeetingSet(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.ON_SITE}`}>{this.getScorecardValue(account.partner__c, STAGE.ON_SITE)}</Link>;
    }
    getScorecardProposalPriceQuote(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.PROPOSAL}`}>{this.getScorecardValue(account.partner__c, STAGE.PROPOSAL)}</Link>;
    }
    getScorecardClosedWon(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities?stage=${STAGE.CLOSED}`}>{this.getScorecardValue(account.partner__c, STAGE.CLOSED)}</Link>;
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
    renderAccount(account) {
      return <Link classic hard to={`${APP_ROOT}scorecard/${account.partner__c}/opportunities`}>{account.name}</Link>;
    }
}

export default connect()(ScorecardTable);
