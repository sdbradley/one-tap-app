import React, { Component } from "react";
import { connect } from "react-redux";
import Table from "components/table";
import FetchContacts from "containers/fetchers/fetch_contacts";

class OpportunityContacts extends Component {
  render() {
    return (
      <div>
        <Table
          className="PartnerOpportunityTable-table"
          columns={[
            { name: "Name", property: "name" },
            { name: "Title", property: "title" },
            { name: "Role", property: "role" },
            { name: "Email", property: "email" },
            { name: "Phone", property: "phone" },
            {
              name: "Primary",
              className: "PartnerOpportunityTable-primary",
              renderer: this.renderPrimary
            }
          ]}
          data={this.props.contacts}
          emptyState="No results"
        />
      </div>
    );
  }

  renderPrimary(contact) {
    if (contact && contact.is_primary) {
      return <div>X</div>;
    }
    return null;
  }
}

export default connect((state, props) => {
  return {
    contacts: props.contacts
  };
})(OpportunityContacts);
