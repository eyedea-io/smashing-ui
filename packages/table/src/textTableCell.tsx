import * as React from 'react'
import {Text} from '@smashing/typography'
import {TableCell} from './tableCell'
import {TextTableCellProps} from './types/TextTableCell'

const ellipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export const TextTableCell: React.FC<TextTableCellProps> = ({
  isNumber = false,
  children,
  textProps,
  ...props
}) => {
  return (
    <TableCell {...props}>
      <Text
        size={300}
        flex="1"
        {...ellipsis}
        {...(isNumber ? {fontFamily: 'mono'} : {})}
        {...textProps}
      >
        {children}
      </Text>
    </TableCell>
  )
}
