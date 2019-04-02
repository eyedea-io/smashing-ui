import * as foundation from "./default-theme/foundational-styles"
import deepmerge from "deepmerge"
import * as React from "react"
import {themedProperty} from "./utils/themed-property"
import {DefaultTheme, ThemeProvider} from "styled-components"

export const theme: DefaultTheme = {
  radius: "5px",
  ...foundation
}

export {themedProperty}

export const SmashingThemeProvider = ({
  theme: userTheme = {},
  children
}: {
  children: React.ReactChild
  theme: Partial<DefaultTheme>
}) => {
  return (
    <ThemeProvider theme={deepmerge(theme, userTheme)}>
      {children}
    </ThemeProvider>
  )
}

export const getDefault = (
  component: string,
  prop: string,
  defaultValue: string | number,
  propValue?: string | number
): any => (_: {theme: DefaultTheme}) => {
  if (propValue !== undefined) {
    return propValue
  }

  if (
    _.theme.defaults &&
    _.theme.defaults[component] !== undefined &&
    _.theme.defaults[component][prop] !== undefined
  ) {
    return _.theme.defaults[component][prop]
  }

  return defaultValue
}

export const getTextSizeForControlHeight = (height: number) => {
  if (height <= 24) return 300
  if (height <= 28) return 300
  if (height <= 32) return 300
  if (height <= 36) return 400
  if (height <= 40) return 400

  return 500
}

export type I<T> = T

declare module "styled-components" {
  // Helper that allows interface to extend type
  export interface SmashingThemeFontFamilies
    extends I<typeof foundation.fontFamilies> {}
  export interface SmashingThemeFills extends I<typeof foundation.fills> {}
  export interface SmashingThemeScales extends I<typeof foundation.scales> {}
  export interface SmashingThemePalette extends I<typeof foundation.palette> {}
  export interface SmashingThemeColors extends I<typeof foundation.colors> {}
  export interface SmashingThemeSpacing extends I<typeof foundation.spacing> {}
  export interface DefaultTheme {
    radius: string
    palette: SmashingThemePalette
    scales: SmashingThemeScales
    fills: SmashingThemeFills
    colors: SmashingThemeColors
    spacing: SmashingThemeSpacing
    fontFamilies: SmashingThemeFontFamilies
  }
}
