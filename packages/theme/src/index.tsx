import spacing from "./default-theme/spacing"
import {colors} from "./default-theme/foundational-styles"
import {fontFamilies, text} from "./default-theme/typography"
import {helpers} from "./default-theme/helpers"
import {theme as smashingTheme} from "./default-theme/theme"

export const theme = {
  ...smashingTheme,
  ...helpers
}

// Helper that allows interface to extend type
export type I<T> = T

export interface SmashingThemeStyle {
  text: typeof text
  headings: typeof text
}
export interface SmashingThemeFontFamilies extends I<typeof fontFamilies> {}
export interface SmashingThemeColors extends I<typeof colors> {}
export interface SmashingThemeSpacing extends I<typeof spacing> {}

declare module "styled-components" {
  export interface DefaultTheme extends I<typeof helpers> {
    radius: string
    style: SmashingThemeStyle
    colors: SmashingThemeColors
    spacing: SmashingThemeSpacing
    fontFamilies: SmashingThemeFontFamilies
  }
}
