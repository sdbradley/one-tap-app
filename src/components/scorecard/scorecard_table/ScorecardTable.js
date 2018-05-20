import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Link from 'components/link';
import jinqJs from 'jinq';

class ScorecardTable extends Component {

  STAGE = {
    UPCOMING: "Upcoming",
    OCCURRED: "Occurred",
    NEXT_STEPS: "Next Steps Established",
    ON_SITE: "On-Site Meeting Set",
    PROPOSAL: "Proposal/Price Quote",
    CLOSED: "Closed Won"
  };

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
      return this.getScorecardValue(account.partner__c, this.STAGE.UPCOMING);
    }
    getScorecardOccurred(account) {
      return this.getScorecardValue(account.partner__c, this.STAGE.OCCURRED);
    }
    getScorecardNextStepsEstablished(account) {
      return this.getScorecardValue(account.partner__c, this.STAGE.NEXT_STEPS);
    }
    getScorecardOnSiteMeetingSet(account) {
      return this.getScorecardValue(account.partner__c, this.STAGE.ON_SITE);
    }
    getScorecardProposalPriceQuote(account) {
      return this.getScorecardValue(account.partner__c, this.STAGE.PROPOSAL);
    }
    getScorecardClosedWon(account) {
      return this.getScorecardValue(account.partner__c, this.STAGE.CLOSED);
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
      return <Link classic blue to={`${account.partner__c}/opportunities`}>{account.name}</Link>;
    }
}

export default connect()(ScorecardTable);
