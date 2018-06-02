import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Widget from 'components/widget';
import Link from 'components/link';
import './css/stakeholder.scss';
import FetchAccountPartners from 'containers/fetchers/fetch_account_partners';

class StakeholderDashboard extends Component {

  render() {
    return (
    <div className="ContentWrapper ContentWrapper--admin">
      <div className="Container Container--padded">
        <FetchAccountPartners>
          <div className="Partner-dashboard">
          <h1 className="Admin-title">Stakeholder Dashboard</h1>
          <Widget title="Partners">
            <Table className="Partners-table"
            columns={[
              { name: 'Account', renderer: this.renderAccount }
            ]}
            data={this.props.accounts}
            emptyState='No results'
            />
          </Widget>
          </div>
        </FetchAccountPartners>
      </div>
    </div>
    );
  }
  renderAccount(item) {
    if(item) {
      return (
        <Link to={`/#/?partner_id=${item.id}`} hard classic>{item.name}</Link>
      )
    }
    return null;
  }
}

export default connect(
    // Map state to props
    (state, props) => {
      let accounts = state.accounts.all();
      return {
        accounts
      };
    }
  )(StakeholderDashboard);
