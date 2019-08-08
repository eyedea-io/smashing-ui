import * as tinycolor from 'tinycolor2'
import {DefaultTheme} from 'styled-components'
import {getLinearGradientWithStates} from './helpers'
import {CheckboxAppearanceType} from './types'

export const getLabelStyle = (
  appearance: CheckboxAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  if (disabled && appearance === 'card') {
    return {
      color: _.theme.colors.text.muted,
      backgroundColor: 'white',
      fontWeight: 600,
      padding: 16,
      borderRadius: _.theme.radius,
      ..._.theme.elevation.card
      // boxShadow: checked
      //   ? ` inset 0px 2px 4px ${scales.neutral.N6A}`
      //   : `0px 2px 4px ${scales.neutral.N6A}`
    }
  }

  if (appearance === 'card') {
    return {
      ...{..._.theme.elevation.card},
      ...(checked && {
        ..._.theme.colors.checkbox.card.checked,
        boxShadow: `inset 0px 2px 4px ${_.theme.scales.neutral.N6A}`
      }),
      fontWeight: 600,
      padding: _.theme.spacing.sm,
      borderRadius: _.theme.radius,
      '&:focus, &:focus-within': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${tinycolor(
          _.theme.colors.checkbox.card.checked.backgroundColor
        )
          .setAlpha(0.4)
          .toString()}, inset 0 -1px 1px 0 ${_.theme.scales.neutral.N5A}`
      }
    }
  }

  return {}
}

export const getCheckboxStyle = (
  appearance: CheckboxAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  const {scales, colors} = _.theme
  const disabledAppearance = {
    opacity: 0.8,
    backgroundImage: 'none',
    backgroundColor: scales.neutral.N2A,
    color: scales.neutral.N7,
    boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}`
  }

  switch (appearance) {
    case 'primary':
      const gradient = checked
        ? colors.checkbox.primary
        : colors.checkbox.default
      const primary = {
        backgroundImage: getLinearGradientWithStates(
          gradient.start,
          gradient.end
        ),
        focusColor: tinycolor(gradient.start)
          .setAlpha(0.4)
          .toString(),
        border: gradient.end
      }

      return {
        '& + div': {
          color: 'white',
          backgroundColor: 'white',
          backgroundImage: primary.backgroundImage.base,
          fontWeight: 600,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N3A}`,
          ...((disabled && disabledAppearance) || {})
        },
        ':hover:not([disabled]) + div': {
          backgroundImage: primary.backgroundImage.hover
        },
        ':focus:not([disabled]) + div': {
          outline: 'none',
          boxShadow: `0 0 0 3px ${primary.focusColor}, inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ':active:not([disabled]) + div': {
          backgroundImage: primary.backgroundImage.active,
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
    case 'minimal':
      const theme = colors.checkbox[appearance]
      const backgroundIsTransparent = theme.backgroundColor === 'transparent'
      const flat = {
        color: theme.color,
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
          ? scales.blue.B4A
          : tinycolor(theme.backgroundColor)
              .setAlpha(0.4)
              .toString()
      }

      return {
        '& + div': {
          color: flat.color,
          boxShadow: checked
            ? `inset 0 0 0 1px ${colors.checkbox.minimal.color}`
            : `inset 0 0 0 1px ${scales.neutral.N6}`,
          backgroundColor: flat.backgroundColor.base,
          fontWeight: 600
        },
        ':hover:not([disabled]) + div': {
          backgroundColor: flat.backgroundColor.hover
        },
        ':focus:not([disabled]) + div': {
          outline: 'none',
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N6}, 0 0 0 3px ${flat.focusColor}`
        },
        ':active:not([disabled]) + div': {
          backgroundColor: flat.backgroundColor.active,
          boxShadow: 'none'
        }
      }
    default:
      return {}
  }
}
