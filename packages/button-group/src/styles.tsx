import {Button} from '@smashing/button'
import styled from 'styled-components'
import {getButtonStyle} from '@smashing/button/lib/esm/styles'
import {ButtonGroupWrapperProps} from './types'

export const ButtonGroupWrapper = styled.div<ButtonGroupWrapperProps>`
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
  grid-template-columns: ${_ => '1fr '.repeat(_.childrenAmount)};
  border-radius: ${_ => _.theme.radius};
`

export const StyledButton = styled(Button)<{
  checked: boolean
  center?: boolean
}>`
  border-radius: 0;
  ${_ => {
    const activeStyle = getButtonStyle(_.appearance)(_)[':active']
    return _.checked ? activeStyle : {}
  }}
  ${_ => _.center && 'justify-content: center;'}
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
