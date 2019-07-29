import * as tinycolor from "tinycolor2"
import {DefaultTheme} from "styled-components/macro"
import {getLinearGradientWithStates} from "./helpers"

export type AppearanceType = "primary" | "minimal" | "card"

export const getLabelStyle = (
  appearance: AppearanceType,
  disabled: boolean = false,
  checked: boolean = false
) => (_: {theme: DefaultTheme}) => {
  const {colors, fills, scales} = _.theme
  const disabledAppearance = {
    color: colors.text.muted
  }
  if (disabled) {
    return disabledAppearance
  }
  switch (appearance) {
    case "primary":
      return {
        color: colors.text.dark
      }
    case "minimal":
      return {
        color: checked ? fills.minimal.darkBlue.color : colors.text.muted
      }
    case "card":
      return {
        color: checked ? "white" : fills.minimal.darkBlue.color,
        backgroundColor: checked ? colors.checkbox.card : "white",
        fontWeight: 600,
        padding: 16,
        borderRadius: 8,
        boxShadow: checked
          ? ` inset 0px 2px 4px ${scales.neutral.N6A}`
          : `0px 2px 4px ${scales.neutral.N6A}`
      }
  }
}

export const getCheckboxStyle = (
  appearance: AppearanceType,
  disabled: boolean = false,
  checked: boolean = false
) => (_: {theme: DefaultTheme}) => {
  const {scales, colors} = _.theme
  const disabledAppearance = {
    opacity: 0.8,
    backgroundImage: "none",
    backgroundColor: scales.neutral.N2A,
    boxShadow: "none",
    color: scales.neutral.N7A
  }

  if (disabled) {
    return disabledAppearance
  }
  switch (appearance) {
    case "primary":
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
        color: "white",
        backgroundColor: "white",
        backgroundImage: primary.backgroundImage.base,
        fontWeight: 600,
        border: `1px solid ${primary.border}`,
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 -1px 1px 0 ${
          scales.neutral.N2A
        }`,
        ":hover": {
          backgroundImage: primary.backgroundImage.hover
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${primary.focusColor}, inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 -1px 1px 0 ${scales.neutral.N5A}`
        },
        ":active": {
          backgroundImage: primary.backgroundImage.active,
          boxShadow: `inset 0 0 0 1px ${
            scales.neutral.N4A
          }, inset 0 1px 1px 0 ${scales.neutral.N2A}`
        }
      }
    case "minimal":
      const theme = colors.checkbox[appearance]
      const backgroundIsTransparent = theme.backgroundColor === "transparent"
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
          ? scales.blue.B5A
          : tinycolor(theme.backgroundColor)
              .setAlpha(0.4)
              .toString()
      }

      return {
        color: flat.color,
        border: checked
          ? `1px solid ${colors.checkbox.minimal.color}`
          : `1px solid ${colors.text.muted}`,
        backgroundColor: flat.backgroundColor.base,
        fontWeight: 600,
        ":hover": {
          backgroundColor: flat.backgroundColor.hover
        },
        ":focus": {
          outline: "none",
          boxShadow: `0 0 0 3px ${flat.focusColor}`
        },
        ":active": {
          backgroundColor: flat.backgroundColor.active,
          boxShadow: `none`
        }
      }
    case "card":
      return {}
  }
}
