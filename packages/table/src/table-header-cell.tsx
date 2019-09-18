import * as React from 'react'
import {TableCell} from './table-cell'
import {TableCellProps} from './types/table-cell'

export const TableHeaderCell: React.FC<TableCellProps> = ({...props}) => {
  return <TableCell overflow="visible" {...props} />
}
