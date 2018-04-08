import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUserLogout } from 'actions/authentication';
import { openSidebar, toggleSidebar } from '../../actions/navigation';
import classNames from 'classnames';
import Icon from 'components/icon';
import Link from 'components/link';

const chevron = String.fromCharCode("9664");
const stopProp = (e) => e.stopPropagation();

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = { open: false };
  }

  componentDidMount() {
    window.addEventListener('click', this.closeNav);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeNav);
  }

  closeNav() {
    this.setState({ open: false });
  }

  handleNavToggle() {
    this.setState({ open: !this.state.open });
  }

  toggleSidebar() {
    this.props.openSidebar();
    this.props.toggleSidebar();
    //if (this.props.sidebarStatic) {
    //  this.props.dispatch(changeActiveSidebarItem(null));
    //} else {
      //const paths = this.props.location.pathname.split('/');
      //paths.pop();
      //this.props.dispatch(changeActiveSidebarItem(paths.join('/')));
    //}
  }

  render() {
    return(
      <div className={classNames('Header', { 'Header--open': this.state.open, 'Header-withContent': this.props.content })}>
        <div className="Header-content">
          {this.renderLogo()}
        </div>
        <div className="Header-center">
        </div>
        <div className="Header-right" onClick={stopProp}>
          <span className="Header-greeting">{this.props.name}</span>
          <div className="Header-navToggle" onClick={this.handleNavToggle}>
            <Icon className="Header-icon" type="user"/>
            <span className="Header-chevron">{chevron}</span>
          </div>
        </div>
        {this.renderNav()}
      </div>
    )
  }

  renderLogo() {
    return (
      <div className="Header-logo"><img className="Header-logo--image" src="https://s3.amazonaws.com/test.1tap.ontappipeline.com/cdn/images/otp-logo.png" /></div>
    )
  }

  renderNav() {
    return (
      <ul className="Header-nav">
        <li className="Header-navItem"><Link to='/profile'>Profile</Link></li>
        <li className="Header-navItem"><Link onClick={this.props.logout}>Logout</Link></li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.authentication.user.fullName()
})

const mapDispatchToProps = { 
  logout: currentUserLogout,
  toggleSidebar: toggleSidebar,
  openSidebar: openSidebar
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
