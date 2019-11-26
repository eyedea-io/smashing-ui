import * as React from 'react'
import {TableBody} from './table-body'
import {TableCell} from './table-cell'
import {TableHead} from './table-head'
import {TableHeaderCell} from './table-header-cell'
import {TableRow} from './table-row'
import {TextTableCell} from './text-table-cell'
import {TextTableHeaderCell} from './text-table-header-cell'
import {SearchHeader} from './select-table-header-cell'
import styled from 'styled-components'

class TableRC extends React.Component {
  static Body = TableBody

  static Head = TableHead

  static HeaderCell = TableHeaderCell

  static TextHeaderCell = TextTableHeaderCell

  static Row = TableRow

  static Cell = TableCell

  static TextCell = TextTableCell

  static SearchHeaderCell = SearchHeader

  render() {
    const {children, ...props} = this.props
    const Box = styled.div`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    `
    return <Box {...props}>{children}</Box>
  }
}
const Table = styled(TableRC)``

export {Table}
