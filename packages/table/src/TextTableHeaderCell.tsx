import * as React from 'react'
import {Text} from '@smashing/typography'
import {TableHeaderCell} from './tableHeaderCell'
import {TextTableHeaderCellProps} from './types/TextTableCell'

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
