import React, { Component } from 'react';
import { connect } from 'react-redux';

class CallNotes extends Component {

  render() {
    return (
      <div className="CallNotes-body">
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    )
  }

  createMarkup() {
    return {__html: this.props.notes};
  }
}

export default connect(
  (state, props) => {
      let notes = props.opportunity && props.opportunity.notes && props.opportunity.notes.length > 0 && props.opportunity.notes[0].body;
    return {
        notes: notes
    };
  }
)(CallNotes);
