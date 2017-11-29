import React, { Component } from 'react';
import classNames from 'classnames';
import Link from 'components/link';
import { RIGHT } from 'constants';
import Righteous from 'containers/righteous';

export default class SidebarNav extends Component {
  render() {
    return (
      <ul className={classNames("SidebarNav", {"SidebarNav--showLabels": this.props.showLabels})}>
        {this.renderHeader()}
        <Righteous right={RIGHT.ENROLLMENT_MODULES}>
          {this.renderLinkItem(`/enrollment/${this.props.enrollmentId}`, 'box', 'View Course')}
        </Righteous>

        <Righteous right={RIGHT.COURSE_MODULES}>
          {this.renderLinkItem(`/course/${this.props.courseId}`, 'box', 'View Course')}
        </Righteous>

        <Righteous right={RIGHT.COURSE_MATERIALS}>
          {this.renderLinkItem(`/course/${this.props.courseId}/materials`, 'download', 'Course Materials')}
        </Righteous>

        <Righteous right={RIGHT.COURSE_GRADEBOOK}>
          {this.renderLinkItem(`/course/${this.props.courseId}/gradebook`, 'notebook', 'Gradebook', true)}
        </Righteous>

        <Righteous right={RIGHT.ENROLLMENT_GRADEBOOK}>
          {this.renderLinkItem(`/enrollment/${this.props.enrollmentId}/gradebook`, 'notebook', 'My Gradebook')}
        </Righteous>

        <Righteous right={RIGHT.COURSE_STUDENTS}>
          {this.renderLinkItem(`/course/${this.props.courseId}/students`, 'user', 'Students', true)}
        </Righteous>

        <Righteous right={RIGHT.COURSE_SYLLABUS}>
          {this.renderLinkItem(`/course/${this.props.courseId}/syllabus`, 'flipPad', 'Syllabus')}
        </Righteous>
      </ul>
    );
  }

  renderHeader() {
    return this.props.header
      ? (
        <li className="SidebarNav-header">
          {this.props.header}
        </li>
      )
      : null;
  }

  renderLinkItem(target, icon, label, subRouteActivated = false) {
    return (
      <li className="SidebarNav-item">
        <Link className="SidebarNav-link" full icon={icon} to={target} blue subRouteActivated={subRouteActivated}>
          <span className="SidebarNav-label">{label}</span>
        </Link>
      </li>
    )
  }
}
