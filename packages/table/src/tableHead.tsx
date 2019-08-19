import * as React from 'react'
import {TableBox} from './tableBox'
import {TableHeadProps} from './types/tableHead'
import {useDefaults} from '@smashing/theme'
import styled from 'styled-components'

export const TableHead: React.FC<TableHeadProps> = ({children, ...props}) => {
  const [scrollbarWidth, setScrollbarWidth] = React.useState(0)
  const defaults = useDefaults('tableHead', props, {
    height: 32,
    accountForScrollbar: true
  })
  const handleScrollbarSize = width => {
    setScrollbarWidth(width)
  }

  const Box = styled.div<TableHeadProps>`
    padding-right: ${scrollbarWidth};
    display: flex;
    flex-shrink: 0;
    height: ${defaults.height};
    background-color: ${_ => _.theme.scales.neutral.N2};
    border-bottom: 1px solid ${_ => _.theme.colors.border.default};
  `

  return (
    <Box {...props}>
      {children}
      {defaults.accountForScrollbar && <div></div>}
    </Box>
  )
}
