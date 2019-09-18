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
      <Text fontWeight={500} size={300} flex="1" {...textProps}>
        {children}
      </Text>
    </TableHeaderCell>
  )
}
