import * as React from 'react'
import {TableBody} from './tableBody'
import {TableCell} from './tableCell'
import {TableHead} from './tableHead'
import {TableHeaderCell} from './tableHeaderCell'
import {TableRow} from './tableRow'
import {TextTableCell} from './textTableCell'
import {TextTableHeaderCell} from './TextTableHeaderCell'

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
