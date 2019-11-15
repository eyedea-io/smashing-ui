import * as tinycolor from 'tinycolor2'
import {DefaultTheme} from 'styled-components'
import {getLinearGradientWithStates} from './helpers'
import {ButtonIntentType, ButtonAppearanceType} from './types'

export const getButtonTextColor = (
  intent: ButtonIntentType = 'none',
  appearance?: ButtonAppearanceType,
  disabled?: boolean
) => (_: {theme: DefaultTheme}) => {
  const {scales, colors} = _.theme
  if (disabled) {
    return scales.neutral.N7
  }
  switch (appearance) {
    case 'primary':
      return 'white'
    case 'flat':
    case 'minimal':
    case 'subtle':
      const theme =
        colors.button[appearance][intent] || colors.button[appearance].info
      return theme.color
    case 'default':
    default:
      return colors.text[intent]
  }
}

export const getButtonStyle = (
  appearance?: ButtonAppearanceType,
  intent: ButtonIntentType = 'none'
) => (_: {theme: DefaultTheme}) => {
  const {scales, colors, radius} = _.theme
  const disabled = {
    opacity: 0.8,
    backgroundImage: 'none',
    backgroundColor: scales.neutral.N2A,
    boxShadow: 'none',
    color: getButtonTextColor(intent, appearance, true)({theme: _.theme})
  }

  const textColor = getButtonTextColor(intent, appearance)({theme: _.theme})

  switch (appearance) {
    case 'primary':
      const gradient = colors.button.primary[intent]
      const primary = {
        backgroundImage: {
          none: getLinearGradientWithStates(gradient.start, gradient.end),
          success: getLinearGradientWithStates(gradient.start, gradient.end),
          warning: getLinearGradientWithStates(gradient.start, gradient.end),
          danger: getLinearGradientWithStates(gradient.start, gradient.end),
          info: getLinearGradientWithStates(gradient.start, gradient.end)
        }[intent],
        focusColor: tinycolor(gradient.start)
          .setAlpha(0.4)
          .toString()
      }

      return {
        color: textColor,
        backgroundColor: primary.backgroundImage.startColor,
        backgroundImage: primary.backgroundImage.base,
        fontWeight: 600,
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 -1px 1px 0 ${scales.neutral.N2A}`,
        ':hover': {
          backgroundImage: primary.backgroundImage.hover
        },
        ':focus': {
          outline: 'none',
          boxShadow: `0 0 0 3px ${primary.focusColor}, inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ':active': {
          backgroundImage: primary.backgroundImage.active,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        ':disabled': disabled
      }
    case 'flat':
    case 'minimal':
    case 'subtle':
      const theme =
        colors.button[appearance][intent] || colors.button[appearance].info
      const backgroundIsTransparent = theme.backgroundColor === 'transparent'
      const flat = {
        color: textColor,
        backgroundColor: {
          base: theme.backgroundColor,
          hover: backgroundIsTransparent
            ? scales.neutral.N2A
            : tinycolor(theme.backgroundColor)
                .setAlpha(0.8)
                .toString(),
          active: backgroundIsTransparent
            ? scales.blue.B3A
            : tinycolor(theme.backgroundColor)
                .darken()
                .desaturate()
                .toString()
        },
        focusColor: backgroundIsTransparent
          ? scales.blue.B5A
          : tinycolor(theme.backgroundColor)
              .setAlpha(0.4)
              .toString()
      }

      return {
        color: flat.color,
        backgroundColor: flat.backgroundColor.base,
        fontWeight: 600,
        ':hover': {
          backgroundColor: flat.backgroundColor.hover
        },
        ':focus': {
          outline: 'none',
          boxShadow: `0 0 0 3px ${flat.focusColor}`
        },
        ':active': {
          backgroundColor: flat.backgroundColor.active,
          boxShadow: 'none'
        },
        ':disabled': disabled
      }
    case 'outline':
      const {outline} = _.theme.colors.button
      const boxShadow = (state: keyof typeof outline.borderColor) =>
        `inset 0 0 0 ${outline.borderWidth}px ${outline.borderColor[state]}`

      return {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        borderRadius: radius,
        boxShadow: boxShadow('default'),
        ':hover': {
          boxShadow: boxShadow('hover')
        },
        ':focus': {
          outline: 'none',
          boxShadow: boxShadow('focus')
        },
        ':active': {
          boxShadow: boxShadow('active')
        },
        '&[aria-invalid="true"]': {
          color: colors.text.danger,
          boxShadow: boxShadow('invalid')
        },
        ':disabled': {
          cursor: 'default',
          boxShadow: boxShadow('disabled'),
          color: colors.text.muted
        }
      }
    case 'default':
    default:
      return {
        color: textColor,
        backgroundColor: 'white',
        fontWeight: 600,
        backgroundImage: 'linear-gradient(to bottom, #FFFFFF, #F4F5F7)',
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N2A}`,
        ':hover': {
          backgroundImage: 'linear-gradient(to bottom, #FAFBFB, #EAECEE)'
        },
        ':focus': {
          outline: 'none',
          backgroundImage: 'none',
          boxShadow: `0 0 0 3px ${scales.blue.B4A}, inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 -1px 1px 0 ${scales.neutral.N4A}`
        },
        ':active': {
          backgroundImage: 'none',
          backgroundColor: scales.blue.B3A,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        '&[aria-expanded="true"]': {
          backgroundImage: 'none',
          color: colors.text.intense,
          backgroundColor: scales.blue.B3A
        },
        ':disabled': disabled
      }
  }
}
