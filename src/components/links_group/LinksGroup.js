import React, { Component } from 'react';
import { Link } from 'components/link';
import { connect } from 'react-redux';
import { viewModal } from 'actions/modal';
import s from './LinksGroup.scss';

class LinksGroup extends Component {
  static defaultProps = {
    headerLink: null,
    childrenLinks: null,
    className: '',
  };

  constructor(props) {
    super(props);
    this.togglePanelCollapse = this.togglePanelCollapse.bind(this);

    this.state = {
      headerLinkWasClicked: true,
    };
  }

  togglePanelCollapse() {
    this.props.onActiveSidebarItemChange();
    this.setState({ headerLinkWasClicked:
    !this.state.headerLinkWasClicked || !this.props.isActive });
  }

  render() {
    const isOpen = this.props.isActive && this.state.headerLinkWasClicked;
    return (
      <li className='LinksGroup'>
          <Link className="LoginForm-helpText" classic to={`/login/${this.props.slug}`}>Return to Sign-in.</Link>
      </li>
    );
  }
}

export default connect(null, { viewModal})(LinksGroup)
