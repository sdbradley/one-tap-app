import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SidebarNav from 'components/sidebar_nav';

export default withRouter(
  connect((state, props) => ({
    courseClass: props.params.class_id ? state.classes.find(props.params.class_id) : state.classes.findWhere({ enrollmentId: parseInt(props.params.enrollmentId, 10) }),
  }))(SidebarNav)
);
