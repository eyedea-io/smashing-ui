import * as React from 'react'
import styled from 'styled-components'

export const TableBody = ({children, height, ...props}) => {
  const Box = styled.div`
    flex: 1 1 auto;
    overflow-y: auto;
    min-height: 0px;
    height: ${height}px;
  `
  return <Box {...props}>{children}</Box>
}
