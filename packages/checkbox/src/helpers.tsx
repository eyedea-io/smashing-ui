import * as tinycolor from 'tinycolor2'

export const linearGradient = (top: string, bottom: string) => {
  return `linear-gradient(to bottom, ${top}, ${bottom})`
}

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
    ),
    startColor: startColor,
    endColor: endColor
  }
}
