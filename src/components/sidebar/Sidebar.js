import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'components/link';
import Icon from 'components/icon';
import s from './Sidebar.scss';
import classNames from 'classnames';

import { openSidebar, closeSidebar, changeActiveSidebarItem } from 'actions/navigation';

class Sidebar extends React.Component {

  /*
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired, //eslint-disable-line
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };
  */

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
          <Link to="/app">1Tap</Link>
        </header>
        <ul className='Sidebar-nav'>
          <Link to={this.props.headerLink} className='headerLink' exact>
            <span className={s.icon}>
              <i className={`fa ${this.props.iconName}`} />
            </span>
            Dashboard
          </Link>
        </ul>
        <h5 className='navTitle'>
          RECENT
          <a className='actionLink'>
            <i className='glyphiconSm glyphicon glyphicon-plus float-right' />
          </a>
        </h5>
        {/* eslint-disable */}
        <ul className='sidebarLabels'>
          <li>
            <a href="#">
              <i className="fa fa-circle text-warning mr-2"/>
              <span className='labelName'>My Recent</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-warning mr-2"/>
              <span className='labelName'>Starred</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-warning mr-2"/>
              <span className='labelName'>Background</span>
            </a>
          </li>
        </ul>
        {/* eslint-enable */}
        <h5 className='navTitle'>
          CAMPAIGNS
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
