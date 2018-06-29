import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';

class OpportunityContacts extends Component {

  render() {
    return (
      <div>
        <Table className="PartnerOpportunityTable-table"
        columns={[
            { name: 'Name', property: 'name'},
            { name: 'Title', property: 'title'},
            { name: 'Email', property: 'email'},
            { name: 'Phone', property: 'mobile_phone'},
            { name: 'Primary', renderer: this.renderPrimary}
        ]}
        data={this.props.contacts}
        emptyState='No results'
        />
      </div>
    )
  }

  renderPrimary(contact) {
    if(contact && contact.is_primary) {
      return (
        <div>X</div>
      )
    }
    return null;
  }
}

export default connect(
  (state, props) => {
      let contacts = props.data;
    return {
      contacts: contacts
    };
  }
)(OpportunityContacts);
