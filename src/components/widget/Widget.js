import React, { Component } from 'react';
import jQuery from 'jquery';
import 'imports-loader?window.jQuery=jquery,this=>window!widgster'; // eslint-disable-line
import s from './Widget.scss'; // eslint-disable-line css-modules/no-unused-class
import classNames from 'classnames';

export default class Widget extends Component {

  static defaultProps = {
    title: null,
    className: '',
    children: [],
    close: false,
    fullscreen: false,
    collapse: false,
    refresh: false,
    settings: false,
    settingsInverse: false,
  };

  componentDidMount() {
    jQuery(this.el).widgster({
      bodySelector: '.widget-body',
    });
  }

  render() {
    let classes = classNames(
      'Widget',
      this.props.className
    );
    return (
      <section className={classes} >
        {
          this.props.title && (
            typeof this.props.title === 'string'
              ? <h5 className="Widget-title">{this.props.title}</h5>
              : <header className={s.title}>{this.props.title}</header>
          )
        }
        <div className="Widget-widgetControls">
          {this.props.settings && (
            <a href="#"><i className="glyphicon glyphicon-cog" /></a>
          )}
          {this.props.settingsInverse && (
            <a href="#" className={`bg-gray-transparent Widget-inverse}`}><i className="glyphicon glyphicon-cog text-white" /></a>
          )}
          {this.props.refresh && (
            <a href="#"><i className="fa fa-refresh" /></a>
          )}
          {this.props.fullscreen && (
          <a href="#" data-widgster="fullscreen" title="Fullscreen"><i
            className="glyphicon glyphicon-resize-full"
          /></a>
          )}
          {this.props.fullscreen && (
          <a href="#" data-widgster="restore" title="Restore"><i
            className="glyphicon glyphicon-resize-small"
          /></a>
            )}
          {this.props.collapse && (
            <span>
              <a href="#" data-widgster="collapse" title="Collapse"><i
                className="glyphicon glyphicon-chevron-down"
              /></a>
            </span>
          )}
          {this.props.collapse && (
            <span>
              <a href="#" data-widgster="expand" title="Expand"><i
                className="glyphicon glyphicon-chevron-up"
              /></a>
            </span>
          )}

          {this.props.close && (
            <a href="#" data-widgster="close"><i className="glyphicon glyphicon-remove" /></a>
          )}
        </div>
        <div className="Widget-widgetBody Widget-widget-body">
          {this.props.children}
        </div>
      </section>
    );
  }
}
