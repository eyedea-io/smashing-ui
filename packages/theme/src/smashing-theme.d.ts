import "styled-components"
import {colors} from "./default-theme/foundational-styles"
import spacing from "./default-theme/spacing"
import {fontFamilies} from "./default-theme/typography"
import {theme, Theme} from "."

declare const theme: Theme
type ColorsType = typeof colors
type SpacingType = typeof spacing
type FontFamiliesType = typeof fontFamilies
export interface SmashingThemeFontFamilies extends FontFamiliesType {}
export interface SmashingThemeColors extends ColorsType {}
export interface SmashingThemeSpacing extends SpacingType {}

declare module "styled-components" {
  export interface DefaultTheme {
    radius: string
    colors: SmashingThemeColors
    spacing: SmashingThemeSpacing
    fontFamilies: SmashingThemeFontFamilies
  }
}
