import React from 'react';
import { connect } from 'react-redux';
import Link from 'components/link';
import LinkItem from 'components/link_item';
import classNames from 'classnames';
import { openSidebar, closeSidebar, changeActiveSidebarItem } from 'actions/navigation';
import './Sidebar.scss';

class Sidebar extends React.Component {

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
      //const paths = this.props.location.pathname.split('/');
      //paths.pop();
      this.props.dispatch(openSidebar());
      //this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    }
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
          <LinkItem to="/" iconName="fa-bar-chart" title="Dashboard" />
          <LinkItem to="/scorecard" iconName="fa-dashboard" title="Scorecard" />
          <LinkItem to="/admin" iconName="fa-gear" title="Admin" />
        </ul>
        <h5 className='navTitle'>
          CAMPAIGNS
        </h5>
        {/* eslint-disable */}
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

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation && store.navigation.sidebarOpened,
    sidebarStatic: store.navigation && store.navigation.sidebarStatic,
    activeItem: store.navigation && store.navigation.activeItem,
  };
}

export default connect(mapStateToProps)(Sidebar);
