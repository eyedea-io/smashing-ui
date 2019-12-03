import {Button, getButtonStyle} from '@smashing/button'
import {Text} from '@smashing/typography'
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

const getControlGroupStyle = (
  _: ControlGroupWrapperProps & {
    theme: DefaultTheme
  }
) => {
  switch (_.groupAppearance) {
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

export const ControlGroupWrapper = styled.div<ControlGroupWrapperProps>`
  ${_ => ({
    ...getControlGroupStyle(_)
  })}
`

export const StyledButton = styled(Button)<StyledButtonProps>`
  box-shadow: none;
  position: relative;
  justify-content: ${_ => getTextAlign(_.textAlign)};

  ${_ => {
    const {outline} = _.theme.colors.button
    const border = (state: keyof typeof outline.borderColor) =>
      `${outline.borderWidth}px solid ${outline.borderColor[state]}`

    const getBorder = () => {
      const borderStyle =
        _.activeGroup || _.checked ? border('active') : border('default')

      return {
        borderTop: borderStyle,
        borderBottom: borderStyle,
        borderRight: border('default'),

        '&:first-of-type': {
          borderLeft: borderStyle
        },
        '&:last-of-type': {
          borderRight: borderStyle
        }
      }
    }

    const activeLine = () => ({
      color: _.theme.colors.text.intense,

      '&:after': {
        position: 'absolute',
        content: '" "',
        bottom: 0,
        left: _.theme.spacing.xxs,
        width: `calc(100% - ${_.theme.spacing.sm})`,
        height: '2px',
        backgroundColor: _.theme.colors.text.intense
      }
    })

    let style
    switch (_.appearance) {
      case 'outline':
        style = {
          boxSizing: 'border-box',

          ...(_.checked ? activeLine() : {}),
          ...getBorder(),

          '&:hover, &:active': {
            boxShadow: 'none',
            ...getBorder(),
            ...activeLine()
          }
        }
        break
      default:
        style = {
          ...(_.checked ? getButtonStyle(_.appearance)(_)[':active'] : {})
        }
    }

    return style
  }}

  border-radius: 0;
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
