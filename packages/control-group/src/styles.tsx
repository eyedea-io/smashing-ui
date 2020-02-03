import {Button as SmashingButton, getButtonStyle} from '@smashing/button'
import styled, {DefaultTheme} from 'styled-components'
import {WrapperProps, ButtonProps, Layout, TextAlign} from './types'
import {SelectMenu} from '@smashing/select-menu'

interface ThemeProps {
  theme: DefaultTheme
}

const MORE_BUTTON_SIZE = '50px'

const getEllipsisStyles = (lines: number) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical'
})

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
    const style = {}

    if (_.hasMoreButton && _.visibleItemsCount) {
      style[
        `> button:nth-child(n + ${_.visibleItemsCount}):not(:nth-last-child(-n +2))`
      ] = {
        display: 'none'
      }
      style['.select'] = {
        visibility: 'hidden'
      }
    }
    if (_.hasMoreButton && _.isOpen) {
      style['> button:not(.select)'] = {
        visibility: 'hidden'
      }
      style['.select'] = {
        visibility: 'visible'
      }
    }

    return style
  }

  const getGridTemplateColumns = _ => {
    const colSizeLayout = _.layout !== 'equal' ? 'auto ' : '1fr '
    const lastColSize = _.hasMoreButton ? MORE_BUTTON_SIZE : ''
    const repeatCount = _.hasMoreButton
      ? (_.visibleItemsCount || _.childrenAmount || 1) - 1 || 0
      : _.childrenAmount || 0

    return `${colSizeLayout.repeat(repeatCount)} ${lastColSize}`
  }

  return {
    position: 'relative',
    zIndex: 1,
    display: _.layout === 'full' || 'inline-grid',
    gridTemplateColumns: getGridTemplateColumns(_),
    margin: 0,
    padding: 0,
    maxWidth: _.width && _.width !== 0 ? _.width : '100%',
    borderRadius: _.theme.radius,
    ...openStyle(),

    button: {
      whiteSpace: _.layout === 'equal' ? 'unset' : 'nowrap',
      '& > strong, & > span': {
        ...(_.layout === 'equal' ? getEllipsisStyles(1) : {})
      }
    }
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

  button, label {
    white-space: nowrap;
  }
`

const getBorder = (_: ThemeProps & ButtonProps) => {
  const {outline} = _.theme.colors.button
  const border = (state: keyof typeof outline.borderColor) =>
    `${outline.borderWidth}px solid ${outline.borderColor[state]}`

  const state = getState(_) as keyof typeof outline.borderColor
  const borderStyle = border(state)

  return {
    borderTop: borderStyle,
    borderBottom: borderStyle,
    borderRight: border(getState(_, true)),
    borderLeft: 'none',

    '&:nth-last-of-type(2)': {
      borderBottom: borderStyle
    },
    '&:first-of-type': {
      borderTop: borderStyle,
      borderLeft: borderStyle
    },
    '&:last-of-type': {
      borderRight: borderStyle
    }
  }
}

const getBorderRadius = (_: ThemeProps & {isOpen?: boolean}) => ({
  borderRadius: 0,

  '&:nth-last-of-type(2)': {
    borderRadius: 0
  },
  '&:first-of-type': {
    borderRadius: `${_.theme.radius} 0 0 ${_.theme.radius}`
  },
  '&:last-of-type': {
    borderRadius: `0 ${_.theme.radius} ${_.theme.radius} 0`
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
          ...getButtonStyle(_.appearance)(_),
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

    switch (_.appearance) {
      case 'outline':
        return {
          '&, & strong': {
            color: getTextColor(_.invalid, _.disabled)(_)
          },

          ...(_.checked ? activeLine() : {}),

          '&:hover, &:active': {
            ...(_.disabled ? {} : activeLine())
          }
        }
      default:
        return {}
    }
  }}
`

export const MoreButton = styled(Button)<{isOpen?: boolean}>`
  width: ${MORE_BUTTON_SIZE};
  padding: 0;
  position: ${_ => (_.isOpen ? 'absolute' : 'relative')};
  top: 0;
  right: 0;
`
export const Select = styled(SelectMenu)`
  position: absolute;
`
