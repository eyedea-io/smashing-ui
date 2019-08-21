import * as React from 'react'
import {TableCell} from './tableCell'
import {TableCellProps} from './types/tableCell'

export const TableHeaderCell: React.FC<TableCellProps> = ({...props}) => {
  return <TableCell overflow="visible" {...props} />
}
