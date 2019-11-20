import {Button, getButtonStyle} from '@smashing/button'
import styled from 'styled-components'
import {ButtonGroupWrapperProps, StyledButtonProps} from './types'

export const ButtonGroupWrapper = styled.div<ButtonGroupWrapperProps>`
  grid-template-columns: ${_ => '1fr '.repeat(_.childrenAmount)};
  border-radius: ${_ => _.theme.radius};
  display: ${_ => {
    switch (_.layout) {
      case 'equal':
        return 'inline-grid'
      case 'full':
        return 'grid'
      default:
        return 'block'
    }
  }};
`

export const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0;
  justify-content: ${_ => {
    switch (_.textAlign) {
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      default:
        return 'flex-start'
    }
  }};
  ${_ => {
    const activeStyle = getButtonStyle(_.appearance)(_)[':active']
    return _.checked ? activeStyle : {}
  }}
  &:first-of-type {
    border-radius: ${_ => `${_.theme.radius} 0 0 ${_.theme.radius}`};
  }
  &:last-of-type {
    border-radius: ${_ => `0 ${_.theme.radius} ${_.theme.radius} 0`};
  }
  &:focus {
    box-shadow: none;
  }
`
