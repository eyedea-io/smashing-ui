import {Button as SmashingButton, getButtonStyle} from '@smashing/button'
import styled, {DefaultTheme} from 'styled-components'
import {WrapperProps, ButtonProps, Layout, TextAlign} from './types'

interface ThemeProps {
  theme: DefaultTheme
}

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
const getTextColor = (invalid?: boolean, disabled?: boolean) => (
  _: ThemeProps
) => {
  if (disabled) {
    return _.theme.colors.text.muted
  }
  if (invalid) {
    return _.theme.colors.text.danger
  }

  return _.theme.colors.text.intense
}

const getDisplay = (layout?: Layout) => {
  switch (layout) {
    case 'full':
      return 'grid'
    case 'equal':
    default:
      return 'inline-grid'
  }
}

const getState = (_: ButtonProps & ThemeProps, ommitActive?: boolean) => {
  if (_.disabled) {
    return 'disabled'
  }
  if (_.invalid) {
    return 'invalid'
  }
  if ((_.activeGroup || _.checked) && !ommitActive) {
    return 'active'
  }

  return 'default'
}

const getButtonGroupStyle = (_: WrapperProps & ThemeProps) => {
  const openStyle = () => {
    const elemLiStyle = {}
    if (!_.isOpen && _.visibleItemsCount) {
      elemLiStyle[
        `> button:nth-child(n + ${_.visibleItemsCount}):not(:nth-last-child(1))`
      ] = {
        display: 'none'
      }
    }

    return elemLiStyle
  }

  return {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: _.isOpen ? 'column' : 'row',
    margin: 0,
    padding: 0,
    maxWidth: '100%',

    ...openStyle(),
    borderRadius: _.theme.radius
  }
}

const getHorizontalGroupStyle = (_: WrapperProps & ThemeProps) => ({
  display: getDisplay(_.layout || 'equal'),
  gridTemplateColumns: '1fr '.repeat(_.childrenAmount || 0),
  gridColumnGap: _.theme.spacing.xxs
})

const getVerticalGroupStyle = (_: WrapperProps & ThemeProps) => ({
  display: getDisplay(_.layout || 'equal'),
  gridTemplateColumns: '1fr ',
  gridRowGap: _.theme.spacing.xxs,

  '> *': {
    marginBottom: _.theme.spacing.xxxs
  }
})

const getControlGroupStyle = (_: WrapperProps & ThemeProps) => {
  switch (_.groupAppearance) {
    case 'button':
      return getButtonGroupStyle(_)
    case 'radio-horizontal':
    case 'checkbox-horizontal':
      return getHorizontalGroupStyle(_)
    case 'radio-vertical':
    case 'checkbox-vertical':
      return getVerticalGroupStyle(_)
    default:
      return {}
  }
}

export const ControlGroupWrapper = styled.div<WrapperProps>`
  ${_ => ({
    ...getControlGroupStyle(_)
  })}
`

const getBorder = (_: ThemeProps & ButtonProps) => {
  const {outline} = _.theme.colors.button
  const border = (state: keyof typeof outline.borderColor) =>
    `${outline.borderWidth}px solid ${outline.borderColor[state]}`

  const state = getState(_) as keyof typeof outline.borderColor
  const borderStyle = border(state)

  return {
    borderTop: _.isOpen ? border(getState(_, true)) : borderStyle,
    borderBottom: _.isOpen ? 'none' : borderStyle,
    borderRight: _.isOpen ? borderStyle : border(getState(_, true)),
    borderLeft: _.isOpen ? borderStyle : 'none',

    '&:first-of-type': {
      borderTop: borderStyle,
      borderLeft: borderStyle
    },
    '&:nth-last-of-type(2)': {
      borderBottom: borderStyle
    },
    '&:last-of-type': {
      borderRight: _.isOpen ? 'none' : borderStyle
    }
  }
}

const getBorderRadius = (_: ThemeProps & {isOpen?: boolean}) => ({
  borderRadius: 0,

  '&:first-of-type': {
    borderRadius: _.isOpen
      ? `${_.theme.radius} ${_.theme.radius} 0 0`
      : `${_.theme.radius} 0 0 ${_.theme.radius}`
  },

  '&:nth-last-of-type(2)': {
    borderRadius: _.isOpen ? `0 0 ${_.theme.radius} ${_.theme.radius}` : 0
  },

  '&:last-of-type': {
    borderRadius: `0 ${_.theme.radius} ${_.theme.radius} 0`,
    ...(_.isOpen
      ? {
          '&, &:hover, &:active, &[aria-invalid="true"]': {
            border: 0,
            borderRadius: 0
          }
        }
      : {})
  }
})

const Button = styled(SmashingButton)<ButtonProps>`
  box-shadow: none;
  position: relative;
  white-space: nowrap;

  ${_ => {
    let style
    switch (_.appearance) {
      case 'outline':
        style = {
          boxSizing: 'border-box',
          ...getBorderRadius(_),

          '&, &:hover, &:active, &[aria-invalid="true"], &:disabled': {
            boxShadow: 'none',
            ...getBorder(_)
          }
        }
        break
      default:
        style = {
          ...getBorderRadius(_),
          ...(_.checked ? getButtonStyle(_.appearance)(_)[':active'] : {})
        }
    }

    return style
  }}

  &:focus {
    box-shadow: none;
  }
`

export const ControlButton = styled(Button)<ButtonProps>`
  justify-content: ${_ => getTextAlign(_.textAlign)};

  ${_ => {
    const activeLine = () => ({
      '&, & > strong': {
        color: getTextColor(_.invalid, _.disabled)(_)
      },

      '&:after': {
        position: 'absolute',
        content: '" "',
        bottom: 0,
        left: _.theme.spacing.xxs,
        width: `calc(100% - ${_.theme.spacing.sm})`,
        height: '2px',
        backgroundColor: 'currentColor'
      }
    })

    let style
    switch (_.appearance) {
      case 'outline':
        style = {
          ...(_.checked ? activeLine() : {}),

          '&:hover, &:active': {
            ...(_.disabled ? {} : activeLine())
          }
        }
        break
      default:
        style = {}
    }

    return style
  }}
`

export const MoreButtonArrow = styled.div<{
  isOpen: boolean
  ref: any
  invalid?: boolean
  disabled?: boolean
}>`
  border: none;
  background: transparent;
  cursor: ${_ => (_.disabled ? 'default' : 'pointer')};
  width: inherit;
  height: 100%;

  svg {
    transform: ${_ => (_.isOpen ? 'rotateX(180deg)' : '')};

    fill: ${_ => getTextColor(_.invalid, _.disabled)(_)};
  }
  :focus {
    outline: none;
  }
`

export const MoreButton = styled(Button)<{isOpen?: boolean}>`
  width: 50px;
  padding: 0;
  position: ${_ => (_.isOpen ? 'absolute' : 'relative')};
  top: 0;
  right: 0;
`
