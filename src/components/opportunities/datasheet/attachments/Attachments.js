import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';

class Attachments extends Component {

  render() {
    return (
      <div>
        <Table className="PartnerOpportunityTable-table"
        columns={[
            { name: 'Name', renderer: this.renderAttachmentLink},
            { name: 'Downloaded', renderer: this.renderDownloaded}
        ]}
        data={this.props.attachments}
        emptyState='No results'
        />
      </div>
    )
  }

  renderAttachmentLink(attachment) {
    /*
    if(attachment) {
      let url = `/attachments/${attachment.id}`;
      return (
        <div><a href={url}>{attachment.name}</a></div>
      )
    }
    */
    return attachment.name;
  }

  renderDownloaded(attachment) {
    if(attachment && attachment.recorded_downloaded_date > 0) {
      return (
        <div>{attachment.recorded_downloaded_date}</div>
      )
    }
    return "Not yet downloaded";
  }
}

export default connect(
  (state, props) => {
      let attachments = props.opportunity && props.opportunity.attachments;
    return {
      attachments: attachments
    };
  }
)(Attachments);
