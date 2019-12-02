import {Button, getButtonStyle} from '@smashing/button'
import styled, {DefaultTheme} from 'styled-components'
import {
  ControlGroupWrapperProps,
  StyledButtonProps,
  ControlGroupAppearanceType,
  Layout
} from './types'

export const ControlGroupWrapper = styled.div<ControlGroupWrapperProps>`
  ${_ => getControlGroupStyle(_.layout, _.childrenAmount, _.appearance)}
`

const display = (layout?: Layout) => {
  switch (layout) {
    case 'equal':
      return 'inline-grid'
    case 'full':
      return 'grid'
    default:
      return 'block'
  }
}

const getControlGroupStyle = (
  layout?: Layout,
  childrenAmount?: number,
  appearance?: ControlGroupAppearanceType
) => {
  switch (appearance) {
    case 'button':
      return getButtonGroupStyle(layout, childrenAmount)
    case 'radio-horizontal':
    case 'checkbox-horizontal':
      return getHorizontalGroupStyle(layout, childrenAmount)
    case 'radio-vertical':
    case 'checkbox-vertical':
      return getVerticalGroupStyle(layout)
    default:
      return {}
  }
}

const getButtonGroupStyle = (layout?: Layout, childrenAmount?: number) => (_: {
  theme: DefaultTheme
}) => {
  return {
    borderRadius: _.theme.radius,
    display: display(layout),
    gridTemplateColumns: '1fr '.repeat(childrenAmount || 0)
  }
}

const getHorizontalGroupStyle = (
  layout?: Layout,
  childrenAmount?: number
) => (_: {theme: DefaultTheme}) => {
  return {
    display: layout === 'full' ? 'grid' : 'inline-grid',
    gridTemplateColumns: '1fr '.repeat(childrenAmount || 0)
  }
}

const getVerticalGroupStyle = (layout?: Layout) => (_: {
  theme: DefaultTheme
}) => {
  return {
    display: layout === 'full' ? 'grid' : 'inline-grid',
    gridTemplateColumns: '1fr ',
    '> *': {
      marginBottom: _.theme.spacing.xs
    }
  }
}

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
