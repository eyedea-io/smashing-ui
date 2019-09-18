import * as React from 'react'
import {Text} from '@smashing/typography'
import {TableCell} from './table-cell'
import {TextTableCellProps} from './types/text-table-cell'

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
        variant={300}
        flex="1"
        style={ellipsis}
        {...(isNumber ? {fontFamily: 'mono'} : {})}
        {...textProps}
      >
        {children}
      </Text>
    </TableCell>
  )
}
