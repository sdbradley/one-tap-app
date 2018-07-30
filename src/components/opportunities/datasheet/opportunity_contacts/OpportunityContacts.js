import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "components/table";
import FetchContacts from "containers/fetchers/fetch_contacts";

class OpportunityContacts extends Component {
  render() {
    return (
      <FetchContacts accountId={this.props.accountId}>
        <div>
          <Table
            className="PartnerOpportunityTable-table"
            columns={[
              { name: "Name", property: "name" },
              { name: "Title", property: "title" },
              { name: "Email", property: "email" },
              { name: "Phone", property: "phone" },
              { name: "Primary", renderer: this.renderPrimary }
            ]}
            data={this.props.contacts}
            emptyState="No results"
          />
        </div>
      </FetchContacts>
    );
  }

  renderPrimary(contact) {
    if (contact && contact.is_primary_email_recipient__c) {
      return <div>X</div>;
    }
    return null;
  }
}

export default connect((state, props) => {
  let contacts = state.contacts.findWhere(
    o => o.account_id === props.accountId
  );
  return {
    contacts: contacts
  };
})(OpportunityContacts);
