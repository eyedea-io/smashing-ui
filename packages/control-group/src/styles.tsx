import {Button, getButtonStyle} from '@smashing/button'
import styled, {DefaultTheme} from 'styled-components'
import {
  ControlGroupWrapperProps,
  StyledButtonProps,
  Layout,
  TextAlign
} from './types'

const getTextAlign = (textAlign?: TextAlign) => {
  switch (textAlign) {
    case 'center':
      return 'center'
    case 'right':
      return 'flex-end'
    default:
      return 'flex-start'
  }
}

const getDisplay = (layout?: Layout) => {
  switch (layout) {
    case 'equal':
      return 'inline-grid'
    case 'full':
      return 'grid'
    default:
      return 'block'
  }
}

const getButtonGroupStyle = (layout?: Layout, childrenAmount?: number) => (_: {
  theme: DefaultTheme
}) => {
  return {
    borderRadius: _.theme.radius,
    display: getDisplay(layout),
    gridTemplateColumns: '1fr '.repeat(childrenAmount || 0)
  }
}

const getHorizontalGroupStyle = (
  layout?: Layout,
  childrenAmount?: number
) => (_: {theme: DefaultTheme}) => ({
  display: getDisplay(layout || 'equal'),
  gridTemplateColumns: '1fr '.repeat(childrenAmount || 0)
})

const getVerticalGroupStyle = (layout?: Layout) => (_: {
  theme: DefaultTheme
}) => ({
  display: getDisplay(layout || 'equal'),
  gridTemplateColumns: '1fr ',

  '> *': {
    marginBottom: _.theme.spacing.xxxs
  }
})

export const ControlGroupWrapper = styled.div<ControlGroupWrapperProps>`
  ${_ => getControlGroupStyle(_)}
`

const getControlGroupStyle = (
  _: ControlGroupWrapperProps & {
    theme: DefaultTheme
  }
) => {
  switch (_.appearance) {
    case 'button':
      return getButtonGroupStyle(_.layout, _.childrenAmount)(_)
    case 'radio-horizontal':
    case 'checkbox-horizontal':
      return getHorizontalGroupStyle(_.layout, _.childrenAmount)(_)
    case 'radio-vertical':
    case 'checkbox-vertical':
      return getVerticalGroupStyle(_.layout)
    default:
      return {}
  }
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0;
  justify-content: ${_ => getTextAlign(_.textAlign)};

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
