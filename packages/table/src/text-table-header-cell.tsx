import * as React from 'react'
import {Text} from '@smashing/typography'
import {TableHeaderCell} from './table-header-cell'
import {TextTableHeaderCellProps} from './types/text-table-cell'

export const TextTableHeaderCell: React.FC<TextTableHeaderCellProps> = ({
  children,
  textProps,
  ...props
}) => {
  return (
    <TableHeaderCell {...props}>
      <Text variant={300} {...textProps} style={{flex: 1, fontWeight: 500}}>
        {children}
      </Text>
    </TableHeaderCell>
  )
}
