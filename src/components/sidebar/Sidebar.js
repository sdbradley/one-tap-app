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

  renderCampaignsLink() {
    return <LinkItem headerLink={this.stakeholderURL()} to={this.stakeholderURL()} iconName="fa-users" title="Campaigns" />;
  }
  renderDashboardLink() {
    if (!this.props.campaignId) return null;
    return <LinkItem headerLink={this.dashboardURL()} to={this.dashboardURL()} iconName="fa-bar-chart" title="Dashboard" />
  }
  renderScorecardLink() {
    if (!this.props.campaignId) return null;
    return <LinkItem headerLink={this.scorecardURL()} to={this.scorecardURL()} iconName="fa-dashboard" title="Scorecard" />;
  }
  renderAdminLink() {
    if(this.props.user.hasRole(ROLE.ADMIN)) {
      return <LinkItem headerLink={this.adminURL()} to={this.adminURL()} iconName="fa-gear" title="Admin" />;
    }
    return null;
  }
  stakeholderURL() {
    return `/`;
  }
  dashboardURL() {
    return `/campaigns/${this.props.campaignId}`;
  }
  scorecardURL() {
    return `/campaigns/${this.props.campaignId}/scorecard`;
  }
  adminURL() {
    return `/admin`;
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
          {this.renderCampaignsLink()}
          {this.renderDashboardLink()}
          {this.renderScorecardLink()}
          {this.renderAdminLink()}
        </ul>
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
      partnerId: state.navigation && state.navigation.partnerId,
      campaignId: state.navigation && state.navigation.campaignId
    };
  }
)(Sidebar);
