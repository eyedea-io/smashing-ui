import {DefaultTheme} from "styled-components"
import spacing from "./default-theme/spacing"
import {colors} from "./default-theme/foundational-styles"
import {fontFamilies, text} from "./default-theme/typography"

export interface WithTheme {
  theme: DefaultTheme
}

export const themedProperty = (object: any, keyOrValue: string | number) => {
  if (Object.prototype.hasOwnProperty.call(object, keyOrValue)) {
    return object[keyOrValue]
  }

  return keyOrValue
}

export const ensureTheme = (cb: (config: DefaultTheme) => any) => (
  props: WithTheme
) => {
  return cb(Object.is(props.theme, {}) ? props.theme : theme)
}

export const getTextColor = (color: string) =>
  ensureTheme(_ => themedProperty(_.colors.text, color))

export const getFontFamily = (fontFamily: string) =>
  ensureTheme(_ => themedProperty(_.fontFamilies, fontFamily))

export const getTextStyle = (size: number) => themedProperty(text, String(size))

const helpers = {
  getTextColor,
  getFontFamily,
  getTextStyle
}

export type Theme = typeof helpers & DefaultTheme
export const theme: Theme = {
  ...helpers,
  spacing,
  colors,
  fontFamilies,
  radius: "5px"
}
