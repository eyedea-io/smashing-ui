import {scales, colors} from "../foundational-styles"
import tinycolor from "tinycolor2"
import {getLinearGradientWithStates} from "../../utils/get-linear-gradient-with-states"
import {linearGradient} from "../../utils/linear-gradient"
import {DefaultTheme} from "styled-components"
import {start} from "repl"

export const getTextColorForIntent = (
  intent: string,
  defaultColor?: string
) => {
  switch (intent) {
    case "success":
      return colors.text.success
    case "danger":
      return colors.text.danger
    case "warning":
      return colors.text.warning
    case "none":
    default:
      return defaultColor || colors.text.default
  }
}

export const getPrimaryButtonStylesForIntent = (intent: string) => {
  switch (intent) {
    case "success": {
      const startColor = "#23C277"
      const endColor = "#399D6C"

      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    case "warning": {
      const startColor = "#EE9913"
      const endColor = "#D9822B"

      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    case "danger": {
      const startColor = "#EC4C47"
      const endColor = "#D64540"

      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    default: {
      const startColor = "#0788DE"
      const endColor = "#116AB8"

      return {
        linearGradient: getLinearGradientWithStates(startColor, endColor),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
  }
}

export const getFlatButtonStylesForIntent = (intent: string) => {
  switch (intent) {
    case "success": {
      const startColor = "#6bd692"

      return {
        color: "#025a53",
        backgroundColor: startColor,
        hoverBackgroundColor: tinycolor(startColor)
          .setAlpha(0.8)
          .toString(),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    case "warning": {
      const startColor = "#EACB7E"

      return {
        color: "#735202",
        backgroundColor: startColor,
        hoverBackgroundColor: tinycolor(startColor)
          .setAlpha(0.8)
          .toString(),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    case "danger": {
      const startColor = "#e46060"

      return {
        color: "#500200",
        backgroundColor: startColor,
        hoverBackgroundColor: tinycolor(startColor)
          .setAlpha(0.8)
          .toString(),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
    default: {
      const startColor = "#2a97df"

      return {
        color: "#002952",
        backgroundColor: startColor,
        hoverBackgroundColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString(),
        focusColor: tinycolor(startColor)
          .setAlpha(0.4)
          .toString()
      }
    }
  }
}

export const getButtonStyle = (appearance: string, intent: string) => (_: {
  theme: DefaultTheme
}) => {
  const disabled = {
    opacity: 0.8,
    backgroundImage: "none",
    backgroundColor: scales.neutral.N2A,
    boxShadow: "none",
    color: scales.neutral.N7A
  }

  switch (appearance) {
    case "primary":
      const {
        linearGradient: gradient,
        focusColor
      } = getPrimaryButtonStylesForIntent(intent)

      return {
        color: "white",
        backgroundColor: "white",
        backgroundImage: gradient.base,
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 -1px 1px 0 ${
          scales.neutral.N2A
        }`,
        ":disabled": disabled,
        ":hover": {
          backgroundImage: gradient.hover
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${focusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ":active": {
          backgroundImage: gradient.active,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        ":focus:active": {
          boxShadow: `0 0 0 3px ${focusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
    case "flat":
      const {
        color,
        backgroundColor,
        hoverBackgroundColor,
        focusColor: flatFocusColor
      } = getFlatButtonStylesForIntent(intent)

      return {
        color,
        backgroundColor,
        fontWeight: 600,
        ":disabled": disabled,
        ":hover": {
          backgroundColor: hoverBackgroundColor
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${flatFocusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ":active": {
          backgroundImage: "none",
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
    case "minimal":
      const minimalIntentTextColor = getTextColorForIntent(
        intent,
        scales.blue.B9
      )

      return {
        color: minimalIntentTextColor,
        backgroundColor: "transparent",
        ":disabled": disabled,
        ":hover": {
          backgroundColor: scales.neutral.N2A
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${scales.blue.B5A}`
        },
        ":active": {
          backgroundImage: "none",
          backgroundColor: scales.blue.B3A
        }
      }
    case "default":
    default:
      const intentTextColor = getTextColorForIntent(intent)

      return {
        color: intentTextColor,
        backgroundColor: "white",
        backgroundImage: linearGradient("#FFFFFF", "#F4F5F7"),
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}, inset 0 -1px 1px 0 ${
          scales.neutral.N2A
        }`,
        ":disabled": disabled,
        ":hover": {
          backgroundImage: linearGradient("#FAFBFB", "#EAECEE")
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${scales.blue.B4A}, inset 0 0 0 1px ${
            scales.neutral.N5A
          }, inset 0 -1px 1px 0 ${scales.neutral.N4A}`
        },
        ":active": {
          backgroundImage: "none",
          backgroundColor: scales.blue.B3A,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        },
        ":focus:active": {
          boxShadow: `0 0 0 3px ${scales.blue.B4A}, inset 0 0 0 1px ${
            scales.neutral.N5A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
  }
}
