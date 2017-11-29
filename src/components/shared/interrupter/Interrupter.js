import React, { Component } from 'react';
import classNames from 'classnames';

export default class Interrupter extends Component {
  static dismissClass = 'Interrupter-dismiss';
  static animateInClass = 'animatedIn';
  static animateOutClass = 'animatedOut';
  static hiddenClass = 'is-hidden';
  static sessionStorageTag = '-dismissed';
  static POSITION_TOP = "top";
  static POSITION_RIGHT = "right";
  static POSITION_BOTTOM = "bottom";
  static POSITION_LEFT = "left";

  constructor(props) {
    super(props);
    this.dismiss = this.dismiss.bind(this);
    this.dismissed = window.sessionStorage.getItem(this.props.name + Interrupter.sessionStorageTag) || false;
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      hidden: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, (this.props.delay || 0));
  }

  dismiss()  {
    this.setState({ hidden: true })
    window.sessionStorage.setItem(this.props.name + Interrupter.sessionStorageTag, true);
  }

  handleClick(e) {
    if(e.target.className.indexOf(Interrupter.dismissClass) > -1) {
      this.dismiss();
    }
  }

  getClassNames() {
    return classNames('Interrupter',
                      `Interrupter--${this.props.position || Interrupter.POSITION_TOP}`,
                      this.getAnimateInClass(),
                      this.getAnimateOutClass(),
                      this.getHiddenClass(),
                      this.props.className
                    );
  }

  getAnimateInClass() {
    return this.props.animateIn === undefined ? Interrupter.animateInClass : this.props.animateIn ? Interrupter.animateInClass : '';
  }

  getAnimateOutClass() {
    return this.props.animateOut === undefined ? Interrupter.animateOutClass : this.props.animateOut ? Interrupter.animateOutClass : '';
  }

  getHiddenClass() {
    return this.state.hidden ? Interrupter.hiddenClass : '';
  }

  render() {
    return this.dismissed === false ?
    (
      <div className={this.getClassNames()} onClick={this.handleClick}>
          {this.props.children}
      </div>
    ) : null;
  }
}
