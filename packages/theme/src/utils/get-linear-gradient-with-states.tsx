import {linearGradient} from "./linear-gradient"
import tinycolor from "tinycolor2"

export const getLinearGradientWithStates = (
  startColor: string,
  endColor: string,
  intensityMultiplier = 1
) => {
  return {
    base: linearGradient(startColor, endColor),
    hover: linearGradient(
      tinycolor(startColor)
        .darken(intensityMultiplier * 5)
        .toString(),
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString()
    ),
    active: linearGradient(
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString(),
      tinycolor(endColor)
        .darken(intensityMultiplier * 5)
        .toString()
    )
  }
}
