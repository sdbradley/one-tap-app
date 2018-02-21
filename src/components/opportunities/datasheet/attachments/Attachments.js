import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import { downloadRecording } from 'actions/attachments';

class Attachments extends Component {

  constructor(props) {
    super(props);
    this.renderAttachmentLink = this.renderAttachmentLink.bind(this);
    this.recordingDownloaded = this.recordingDownloaded.bind(this);
  }

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
    if(attachment) {
      let url = `https://s3.amazonaws.com/1tap-otp/attachments/${attachment.name}`;
      return (
        <div><a href={url} download data-id={attachment.id} onClick={this.recordingDownloaded}>{attachment.name}</a></div>
      )
    }
    return null;
  }

  recordingDownloaded(e) {
    let id = e.target.getAttribute('data-id');
    this.props.downloadRecording(id);
  }

  renderDownloaded(attachment) {
    if(attachment && attachment.recording_downloaded_date > 0) {
      return (
        <Moment unix format="ddd MMM DD, YYYY hh:mm a">{attachment.recording_downloaded_date}</Moment>
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
  },
  { downloadRecording }
)(Attachments);
