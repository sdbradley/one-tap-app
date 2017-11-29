import React, { Component } from 'react';
import classNames from 'classnames';

export default class AdminTable extends Component {
  static defaultProps = {
    keyProp: 'id',
    columns: [],
    items: []
  };

  constructor(props) {
    super(props);
    this.labelItem = props.columns.reduce(
      (item, column) => {
        item[column.prop] = column.label;
        return item;
      },
      {}
    );
  }

  render () {
    return (
      <table className='AdminTable'>
        <thead className='AdminTable-head'>
          <AdminTableRow item={this.labelItem} columns={this.props.columns} header/>
        </thead>
        <tbody className='AdminTable-row'>
          {this.props.items.length
            ? this.props.items.map(item => <AdminTableRow key={item[this.props.keyProp]} item={item} columns={this.props.columns}/>)
            : this.renderEmpty()}
        </tbody>
      </table>
    )

  }

  renderEmpty() {
    return (
      <tr>
        <td className='AdminTable-cell AdminTable-cell--empty' colSpan={this.props.columns.length}>{this.props.children}</td>
      </tr>
    )
  }
}

class AdminTableRow extends Component {
  static defaultProps = {
    header: false,
    columns: []
  };

  constructor(props) {
    super(props);
    this.handlers = props.columns.reduce(
      (handlers, column) => {
        if (column.onClick) {
          handlers[column.prop] = () => column.onClick(props.item[column.prop], props.item);
        }
        return handlers;
      },
      {}
    )
  }

  render() {
    return (
      <tr className='AdminTable-row'>
        {this.props.columns.map(column => this.renderCell(column))}
      </tr>
    )
  }

  renderCell(column) {
    let Cell = this.props.header ? 'th' : 'td';
    let content = typeof this.props.item[column.prop] === 'function' ? this.props.item[column.prop]() : this.props.item[column.prop];
    if (column.render && !this.props.header) {
      content = column.render(content, this.props.item);
    }

    return (
      <Cell key={column.prop} className={classNames('AdminTable-cell', `AdminTable-cell--${column.prop}`)}>
        {content}
      </Cell>
    );
  }
}
