import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUserLogout } from 'actions/authentication';
import classNames from 'classnames';
import Icon from 'components/icon';
import Link from 'components/link';

const chevron = String.fromCharCode("9664");
const stopProp = (e) => e.stopPropagation();

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleNavToggle = this.handleNavToggle.bind(this);
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

  render() {
    return(
      <div className={classNames('Header', { 'Header--open': this.state.open, 'Header-withContent': this.props.content })}>
        <div className="Header-content">
          {this.props.content}
        </div>
        <div className="Header-center">
          {this.renderLogo()}
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
      <div></div>
    )
  }

  renderNav() {
    return (
      <ul className="Header-nav">
        <li className="Header-navItem"><Link to='/'>Dashboard</Link></li>
        <li className="Header-navItem"><Link onClick={this.props.logout}>Logout</Link></li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.authentication.user.fullName()
})

const mapDispatchToProps = { logout: currentUserLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
