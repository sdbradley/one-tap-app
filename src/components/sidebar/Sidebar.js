import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'components/link';
import LinkItem from 'components/link_item';
import classNames from 'classnames';
import { ROLE, APP_ROOT } from 'constants';
import { openSidebar, closeSidebar, changeActiveSidebarItem } from 'actions/navigation';
import './Sidebar.scss';

class Sidebar extends Component {

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
    activeItem: '',
  };

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic) {
      this.props.dispatch(openSidebar());
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
  }

  renderPartnersLink() {
    if(this.props.user.hasRole(ROLE.STAKEHOLDER)) {
      return <LinkItem hard headerLink={this.stakeholderURL()} to={this.stakeholderURL()} iconName="fa-users" title="Partners" />;
    }
    return null;
  }
  renderDashboardLink() {
    if(this.props.partnerId) {
      return <LinkItem hard headerLink={this.dashboardURL()} to={this.dashboardURL()} iconName="fa-bar-chart" title="Dashboard" />
    }
    return <LinkItem hard headerLink="/" iconName="fa-bar-chart" title="Dashboard" />;
  }
  stakeholderURL() {
    return `${APP_ROOT}/stakeholder`;
  }
  dashboardURL() {
    return `${APP_ROOT}?partner_id=${this.props.partnerId}`;
  }
  scorecardURL() {
    return `${APP_ROOT}scorecard/?partner_id=${this.props.partnerId}`;
  }
  renderScorecardLink() {
    if(this.props.partnerId) {
      return <LinkItem hard headerLink={this.scorecardURL()} to={this.scorecardURL()} iconName="fa-dashboard" title="Scorecard" />;
    }
    return <LinkItem hard headerLink="/scorecard" iconName="fa-dashboard" title="Scorecard" />;
  }
  renderAdminLink() {
    if(this.props.user.hasRole(ROLE.ADMIN)) {
      return <LinkItem hard headerLink="/admin" to="/admin" iconName="fa-gear" title="Admin" />;
    }
    return null;
  }

  render() {
    return (
      <nav
        onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
        className={classNames(
          'Sidebar',
          {
            'Sidebar-staticSidebar': this.props.sidebarStatic,
            'Sidebar-sidebarClose': !this.props.sidebarOpened
          }
        )}      
      >
        <header className='Sidebar-logo'>
          <Link to="/">1Tap</Link>
        </header>
        <ul className='Sidebar-nav'>
          {this.renderDashboardLink()}
          {this.renderScorecardLink()}
          {this.renderAdminLink()}
        </ul>
        <h5 className='navTitle'>
          CAMPAIGNS
        </h5>
        {/* eslint-disable */}
        {/*
        <ul className='sidebarLabels'>
          <li>
            <a href="#">
              <i className="fa fa-circle text-primary mr-2"/>
              <span className='labelName'>AMC Dell</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-primary mr-2"/>
              <span className='labelName'>EC2 Standard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-primary mr-2"/>
              <span className='labelName'>Dell USA</span>
            </a>
          </li>
        </ul>
        */}
        {/* eslint-enable */}
        <h5 className='navTitle'>
          RECENT
          <a className='actionLink'>
            <i className='glyphiconSm glyphicon glyphicon-plus float-right' />
          </a>
        </h5>
      </nav>
    );
  }
}

export default connect(
  (state, props) => {
    let user = state.authentication.user;
    return {
      user: user,
      sidebarOpened: state.navigation && state.navigation.sidebarOpened,
      sidebarStatic: state.navigation && state.navigation.sidebarStatic,
      activeItem: state.navigation && state.navigation.activeItem,
      partnerId: state.navigation && state.navigation.partnerId
    };
  }
)(Sidebar);
