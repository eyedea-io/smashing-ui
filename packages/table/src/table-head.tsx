import * as React from 'react'
import {TableHeadProps} from './types/table-head'
import {useDefaults} from '@smashing/theme'
import styled from 'styled-components'

export const TableHead: React.FC<TableHeadProps> = ({children, ...props}) => {
  const defaults = useDefaults('tableHead', props, {
    height: 32,
    accountForScrollbar: true
  })

  const Box = styled.div<TableHeadProps>`
    display: flex;
    flex-shrink: 0;
    height: ${defaults.height};
    background-color: ${_ => _.theme.scales.neutral.N2};
    border-bottom: 1px solid ${_ => _.theme.colors.border.default};
  `

  return <Box {...props}>{children}</Box>
}

declare module 'styled-components' {
  export interface SmashingTableHeadDefaults
    extends Partial<{
      tableHead?: {
        height?: number
        accountForScrollbar?: boolean
      }
    }> {}
}
