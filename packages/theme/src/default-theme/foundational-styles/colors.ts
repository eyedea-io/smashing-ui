import palette from "./palette"
import scales from "./scales"

const colors = {
  background: {
    tint1: scales.neutral.N1,
    tint2: scales.neutral.N2,
    overlay: scales.neutral.N7A,

    yellowTint: palette.yellow.lightest,
    greenTint: palette.green.lightest,
    orangeTint: palette.orange.lightest,
    redTint: palette.red.lightest,
    blueTint: palette.blue.lightest,
    purpleTint: palette.purple.lightest,
    tealTint: palette.teal.lightest
  },

  border: {
    default: scales.neutral.N4,
    muted: scales.neutral.N3
  },

  text: {
    muted: scales.neutral.N6,
    default: scales.neutral.N8,
    dark: scales.neutral.N10,
    selected: palette.blue.base,

    // Intent.
    none: scales.neutral.N8,
    success: palette.green.dark,
    info: palette.blue.dark,
    danger: palette.red.dark,
    warning: palette.orange.dark
  },

  link: {
    default: palette.blue.base,
    neutral: palette.neutral.base,

    // Intent.
    success: palette.green.base,
    info: palette.blue.base,
    danger: palette.red.base,
    warning: palette.orange.base
  },

  icon: {
    default: scales.neutral.N8,
    muted: scales.neutral.N7,
    disabled: scales.neutral.N5A,
    selected: palette.blue.base,

    // Intent.
    success: palette.green.base,
    info: palette.blue.base,
    danger: palette.red.base,
    warning: palette.orange.base
  },

  intent: {
    none: palette.blue.base,
    success: palette.green.base,
    danger: palette.red.base,
    warning: palette.orange.base
  }
}

type ColorsType = typeof colors
export interface SmashingThemeColors extends ColorsType {}

export default colors
