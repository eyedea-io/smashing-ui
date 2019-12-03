import {Button, getButtonStyle} from '@smashing/button'
import styled, {DefaultTheme} from 'styled-components'
import {
  ControlGroupWrapperProps,
  StyledButtonProps,
  Layout,
  TextAlign
} from './types'

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

const getControlGroupStyle = (_: ControlGroupWrapperProps & ThemeProps) => {
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

const getBorder = (_: ThemeProps) => {
  const {outline} = _.theme.colors.button
  const border = (state: keyof typeof outline.borderColor) =>
    `${outline.borderWidth}px solid ${outline.borderColor[state]}`

  const borderStyle =
    _.activeGroup || _.checked ? border('active') : border('default')

  return {
    borderTop: borderStyle,
    borderBottom: _.isOpen ? 'none' : borderStyle,
    borderRight: _.isOpen ? borderStyle : border('default'),
    borderLeft: _.isOpen ? borderStyle : 'none',

    '&:first-of-type': {
      borderLeft: borderStyle
    },
    '&:last-of-type': {
      borderRight: borderStyle
    },
    '&:nth-last-of-type(2)': {
      borderBottom: borderStyle
    }
  }
}

const getBorderRadius = (_: ThemeProps) => ({
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
          '&, &:hover, &:active': {
            border: 0,
            borderRadius: 0
          }
        }
      : {})
  }
})

export const StyledButton = styled(Button)<
  Partial<StyledButtonProps> & {isOpen?: boolean}
>`
  box-shadow: none;
  position: relative;

  ${_ => {
    let style
    switch (_.appearance) {
      case 'outline':
        style = {
          boxSizing: 'border-box',

          '&, &:hover, &:active': {
            boxShadow: 'none',
            ...getBorder(_)
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

  &:focus {
    box-shadow: none;
  }
`

export const RegularStyledButton = styled(StyledButton)<StyledButtonProps>`
  justify-content: ${_ => getTextAlign(_.textAlign)};

  ${_ => {
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
          ...(_.checked ? activeLine() : {}),

          '&:hover, &:active': {
            ...activeLine()
          }
        }
        break
      default:
        style = {}
    }

    return style
  }}
`

export const MoreButton = styled.span<{isOpen: boolean}>`
  border: none;
  background: transparent;
  cursor: pointer;
  width: inherit;
  height: 100%;

  svg {
    transform: ${_ => (_.isOpen ? 'rotateX(180deg)' : '')};
  }
  :focus {
    outline: none;
  }
`

export const MoreButtonContainer = styled(StyledButton)<{
  isOpen?: boolean
  invalid?: boolean
}>`
  width: 50px;
  padding: 0;
  position: ${_ => (_.isOpen ? 'absolute' : 'relative')};
  top: 0;
  right: 0;
`
