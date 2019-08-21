import * as foundation from './default-theme/foundational-styles'
import * as constants from './default-theme/constants'
import * as deepmerge from 'deepmerge'
import * as React from 'react'
import {themedProperty} from './utils/themed-property'
import {useDefaults} from './utils/use-defaults'
import {DefaultTheme, ThemeProvider} from 'styled-components'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from './utils/get-text-size-for-control-height'

export const theme: DefaultTheme = {
  radius: '5px',
  ...foundation
}

export {constants}

export const SmashingThemeProvider = ({
  theme: userTheme = {},
  children
}: {
  children: React.ReactChild
  theme?: Partial<DefaultTheme>
}) => {
  return (
    <ThemeProvider theme={deepmerge(theme, userTheme)}>
      {children}
    </ThemeProvider>
  )
}

export {
  themedProperty,
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
}

// Helper that allows interface to extend type
export type I<T> = T

declare module 'styled-components' {
  export interface SmashingThemeFontFamilies
    extends I<typeof foundation.fontFamilies> {}
  export interface SmashingThemeFills extends I<typeof foundation.fills> {}
  export interface SmashingThemeElevation
    extends I<typeof foundation.elevation> {}
  export interface SmashingThemeScales extends I<typeof foundation.scales> {}
  export interface SmashingThemePalette extends I<typeof foundation.palette> {}
  export interface SmashingThemeColors extends I<typeof foundation.colors> {}
  export interface SmashingThemeSpacing extends I<typeof foundation.spacing> {}
  export interface SmashingButtonDefaults {}
  export interface SmashingCheckboxDefaults {}
  export interface SmashingTextInputDefaults {}
  export interface SmashingAlertDefaults {}
  export interface SmashingAvatarDefaults {}
  export interface SmashingBarChartDefaults {}
  export interface SmashingPieChartDefaults {}
  export interface SmashingProgressBarChartDefaults {}
  export interface SmashingSpiderChartDefaults {}
  export interface SmashingRadialProgressDefaults {}
  export interface SmashingTableRowDefaults {}
  export interface SmashingTableHeadDefaults {}
  export interface SmashingTableCellDefaults {}
  export interface SmashingDefaults
    extends SmashingButtonDefaults,
      SmashingCheckboxDefaults,
      SmashingTextInputDefaults,
      SmashingAlertDefaults,
      SmashingBarChartDefaults,
      SmashingPieChartDefaults,
      SmashingSpiderChartDefaults,
      SmashingRadialProgressDefaults,
      SmashingProgressBarChartDefaults,
      SmashingTableRowDefaults,
      SmashingTableHeadDefaults,
      SmashingTableCellDefaults,
      SmashingAvatarDefaults {}
  export interface DefaultTheme {
    radius: string
    elevation: SmashingThemeElevation
    palette: SmashingThemePalette
    scales: SmashingThemeScales
    fills: SmashingThemeFills
    colors: SmashingThemeColors
    spacing: SmashingThemeSpacing
    fontFamilies: SmashingThemeFontFamilies
    defaults?: SmashingDefaults
  }
}
