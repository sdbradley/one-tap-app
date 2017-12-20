import React, { Component } from 'react';
import classNames from 'classnames';

export default class Table extends Component {
  /**
   * @prop className <string> optional class name for the table
   * @prop data <object[]> An arbitrary list of data objects to use for rows
   * @prop columns <iColumnDefinition[]> A list of column definitions
   * @prop dataKey <string> the optional property of the data prop to be used as a key. Will check id by default.
   *
   * @interface iColumnDefinition {
   *   name <string> Name of column
   *   className <string, optional> Class name for column cells
   *   property <string, optional> Name of property field to pull from the data
   *   renderer <function, optional> A function to render the cell with.
   * } A single column definition. Note that either a property OR a renderer is
   * required, but not both.
   */

  static tableClass = 'Table';
  static rowClass = 'Table-row';
  static cellClass = 'Table-cell';
  static headerClass = `${Table.rowClass} ${Table.rowClass}--header`;
  static headerCellClass = `${Table.cellClass} ${Table.cellClass}--header`;
  static emptyCellClass = `${Table.cellClass} ${Table.cellClass}--empty`;

  constructor(props) {
    super(props);
    this.renderHeaderCell = this.renderHeaderCell.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderCell = this.renderCell.bind(this);

    this.state = {
      
    };
  }

  getKey(row, i) {
    let key = this.props.dataKey || 'id';
    if (row[key] !== undefined) {
      return row[key];
    }
    return i;
  }

  render() {
    return (
      <table className={classNames(this.getTableClass(), this.props.className)}>
        <thead>
          <tr className={this.getHeaderClass()}>
            {this.props.columns.map(this.renderHeaderCell)}
          </tr>
        </thead>
        <tbody>{
          this.props.data && this.props.data.length > 0
            ? this.props.data.map(this.renderRow)
            : this.renderEmptyState()
        }</tbody>
      </table>
    );
  }

  renderHeaderCell(column, position) {
    return (
      <th className={classNames(this.getHeaderCellClass(), column.className)} key={position}>
        {column.name}
        {column.sort}
      </th>
    )
  }

  renderRow(row, position) {
    return (
      <tr className={this.getRowClass()} key={this.getKey(row, position)}>
        {this.props.columns.map(
          (column, i) => this.renderCell(row, column, i)
        )}
      </tr>
    );
  }

  renderCell(row, column, position) {
    return (
      <td className={classNames(this.getCellClass(), column.className)} key={position}>
        {column.renderer ? column.renderer(row, position) : row[column.property]}
      </td>
    );
  }

  renderEmptyState() {
    return (
      <tr className={this.getRowClass()}>
        <td className={classNames(this.getEmptyCellClass())} colSpan={this.props.columns.length}>
          {this.props.emptyState || "Nothing to display"}
        </td>
      </tr>
    );
  }

  getTableClass() {
    return this.props.tableClass || Table.tableClass;
  }

  getRowClass() {
    return this.props.rowClass || Table.rowClass;
  }

  getCellClass() {
    return this.props.cellClass || Table.cellClass;
  }

  getHeaderClass() {
    return this.props.headerClass || Table.headerClass;
  }

  getHeaderCellClass() {
    return this.props.headerCellClass || Table.headerCellClass;
  }

  getEmptyCellClass() {
    return this.props.emptyCellClass || Table.emptyCellClass;
  }
}
