import palette from "./palette"
import scales from "./scales"
import fills from "./fills"

const colors = {
  background: {
    white: "white",
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
  },

  button: {
    primary: {
      none: {start: "#557491", end: "#425A70"},
      success: {start: "#23C277", end: "#399D6C"},
      warning: {start: "#EE9913", end: "#D9822B"},
      danger: {start: "#EC4C47", end: "#D64540"},
      info: {start: "#0788DE", end: "#116AB8"}
    },
    subtle: {
      none: fills.subtle.neutral,
      success: fills.subtle.green,
      warning: fills.subtle.yellow,
      danger: fills.subtle.red,
      info: fills.subtle.blue
    },
    flat: {
      none: fills.solid.neutral,
      success: fills.solid.green,
      warning: fills.solid.yellow,
      danger: fills.solid.red,
      info: fills.solid.blue
    },
    minimal: {
      none: fills.minimal.neutral,
      success: fills.minimal.green,
      warning: fills.minimal.orange,
      danger: fills.minimal.red,
      info: fills.minimal.blue
    }
  }
}

export default colors
