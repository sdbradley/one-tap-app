import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'components/table';
import Moment from 'react-moment';
import { API_ROOT } from 'constants';
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
      let url = `${API_ROOT}/api/v2/attachments/${attachment.id}/download/${this.props.user.id}`;
      return (
        <div><a href={url} download data-id={attachment.id}>{attachment.name}</a></div>
      )
    }
    return null;
  }

  recordingDownloaded(e) {
    let id = e.target.getAttribute('data-id');
    this.props.downloadRecording(id);
  }

  renderDownloaded(attachment) {
    if(attachment && attachment.downloads && attachment.downloads.length > 0) {
      return (
        <Moment unix format="ddd MMM DD, YYYY hh:mm a">{attachment.downloads[0].download_date}</Moment>
      )
    }
    return "Not yet downloaded";
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    let attachments = props.opportunity && props.opportunity.attachments;
    return {
      user: user,
      attachments: attachments
    };
  },
  { downloadRecording }
)(Attachments);
