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

const getDisplay = (layout?: Layout) => {
  switch (layout) {
    case 'equal':
      return 'inline-grid'
    case 'full':
      return 'grid'
    default:
      return 'flex'
  }
}

const getState = (_: ButtonProps & ThemeProps) => {
  let state = 'default'

  if (_.activeGroup || _.checked) {
    state = 'active'
  }
  if (_.invalid) {
    state = 'invalid'
  }
  if (_.disabled) {
    state = 'disabled'
  }

  return state
}

const getButtonGroupStyle = (layout?: Layout, childrenAmount?: number) => (
  _: ThemeProps
) => {
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

const getControlGroupStyle = (_: WrapperProps & ThemeProps) => {
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

export const ControlGroupWrapper = styled.div<WrapperProps>`
  ${_ => ({
    ...getControlGroupStyle(_)
  })}

  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: ${_ => (_.isOpen ? 'column' : 'row')};
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;

  ${_ => {
    const elemLiStyle = {}
    if (!_.isOpen && _.visibleItemsCount) {
      elemLiStyle[
        `> button:nth-child(n + ${_.visibleItemsCount}):not(:nth-last-child(1))`
      ] = {
        display: 'none'
      }
    }

    return elemLiStyle
  }}
`

const getBorder = (_: ThemeProps & ButtonProps) => {
  const {outline} = _.theme.colors.button
  const border = (state: keyof typeof outline.borderColor) =>
    `${outline.borderWidth}px solid ${outline.borderColor[state]}`

  const state = getState(_) as keyof typeof outline.borderColor
  let borderStyle = border(state)

  return {
    borderTop: borderStyle,
    borderBottom: _.isOpen ? 'none' : borderStyle,
    borderRight: _.isOpen ? borderStyle : border(state),
    borderLeft: _.isOpen ? borderStyle : 'none',

    '&:first-of-type': {
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
      color: _.invalid
        ? _.theme.colors.text.danger
        : _.theme.colors.text.intense,

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

    fill: ${_ => {
      if (_.invalid) {
        return _.theme.colors.text.danger
      }
      if (_.disabled) {
        return _.theme.colors.text.muted
      }

      return _.theme.colors.text.intense
    }};
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
