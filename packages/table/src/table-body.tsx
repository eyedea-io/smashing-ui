import * as React from 'react'
import styled from 'styled-components'

export const TableBody = ({children, ...props}) => {
  const Box = styled.div`
    display: 'flex';
    flex: 1;
    overflow: 'scroll';
  `
  return <Box {...props}>{children}</Box>
}
