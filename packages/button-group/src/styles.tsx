import {Button} from '@smashing/button'
import styled from 'styled-components'
import {getButtonStyle} from '@smashing/button/lib/esm/styles'

export const ButtonGroupWrapper = styled.div<{
  childrenAmount: number
  full?: boolean
}>`
  display: ${_ => (_.full ? 'grid' : 'grid-inline')};
  grid-template-columns: ${_ => '1fr '.repeat(_.childrenAmount)};
`

export const StyledButton = styled(Button)<{checked?: boolean}>`
  border-radius: 0;
  ${_ => {
    const activeStyle = getButtonStyle(_.appearance)(_)[':active']
    return _.checked ? activeStyle : {}
  }}
  &:first-of-type {
    border-radius: ${_ => `${_.theme.radius} 0 0 ${_.theme.radius}`};
  }
  &:last-child {
    border-radius: ${_ => `0 ${_.theme.radius} ${_.theme.radius} 0`};
  }
  &:focus {
    box-shadow: none;
  }
`
