import * as tinycolor from "tinycolor2"
import {DefaultTheme} from "styled-components/macro"
import {getLinearGradientWithStates} from "./helpers"
import {CheckboxProps} from './types'

export type AppearanceType =
  "primary"
  | "minimal"

export const getCheckboxStyle = (
  appearance: AppearanceType, props:CheckboxProps
) => (_: {theme: DefaultTheme}) => {
  const {scales, colors} = _.theme
  const disabled = {
    opacity: 0.8,
    backgroundImage: "none",
    backgroundColor: scales.neutral.N2A,
    boxShadow: "none",
    color: scales.neutral.N7A
  }

  switch (appearance) {
    case "primary":
      const gradient = colors.checkbox.primary
      const primary = {
        backgroundImage: getLinearGradientWithStates(gradient.start, gradient.end),
        focusColor: tinycolor(gradient.start)
          .setAlpha(0.4)
          .toString()
      }

      return {
        color: "white",
        backgroundColor: "white",
        backgroundImage: primary.backgroundImage.base,
        fontWeight: 600,
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
        },
        ":disabled": disabled
      }
    case "minimal":
      const theme =
        colors.checkbox[appearance]
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
        backgroundColor: flat.backgroundColor.base,
        fontWeight: 600,
        border: "1px solid #596B87",
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
        },
        ":disabled": disabled
      }
  }
}
