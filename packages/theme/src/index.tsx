import {DefaultTheme} from "styled-components"
import spacing from "./default-theme/spacing"
import {colors} from "./default-theme/foundational-styles"
import {fontFamilies, text} from "./default-theme/typography"
import {
  getTextColor,
  getFontFamily,
  getTextStyle
} from "./default-theme/theme-helpers"

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
