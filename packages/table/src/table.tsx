import * as React from 'react'
import {TableBody} from './table-body'
import {TableCell} from './table-cell'
import {TableHead} from './table-head'
import {TableHeaderCell} from './table-header-cell'
import {TableRow} from './table-row'
import {TextTableCell} from './text-table-cell'
import {TextTableHeaderCell} from './text-table-header-cell'

export default class Table extends React.Component {
  static Body = TableBody

  static Head = TableHead

  static HeaderCell = TableHeaderCell

  static TextHeaderCell = TextTableHeaderCell

  static Row = TableRow

  static Cell = TableCell

  static TextCell = TextTableCell

  render() {
    const {children, ...props} = this.props
    return <div {...props}>{children}</div>
  }
}
