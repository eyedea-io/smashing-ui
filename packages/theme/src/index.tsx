import * as foundation from './default-theme/foundational-styles'
import * as constants from './default-theme/constants'
import * as deepmerge from 'deepmerge'
import * as React from 'react'
import {O} from 'ts-toolbelt'
import {themedProperty} from './utils/themed-property'
import {useDefaults} from './utils/use-defaults'
import {DefaultTheme, ThemeProvider, ThemeContext} from 'styled-components'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from './utils/get-text-size-for-control-height'

export const theme: DefaultTheme = {
  radius: '5px',
  ...foundation
}

export {constants}

export type OptionalTheme = O.Optional<DefaultTheme, keyof DefaultTheme, 'deep'>
export type RequiredTheme = O.Required<DefaultTheme, keyof DefaultTheme, 'deep'>

/**
 * Create a theme with TypeScript schema
 * @example
 * const darkTheme = createTheme(theme)
 */
export const createTheme = (theme: OptionalTheme = {}): OptionalTheme =>
  deepmerge({}, theme, {clone: true})

export const SmashingThemeProvider: React.FC<{
  theme?: OptionalTheme
}> = ({theme: userTheme = {}, children}) => {
  return (
    <ThemeProvider
      theme={deepmerge<DefaultTheme>(theme, userTheme as RequiredTheme, {
        clone: true
      })}
    >
      <React.Fragment>{children}</React.Fragment>
    </ThemeProvider>
  )
}

export const SmashingThemeModifier = ({
  theme: modifiedTheme,
  children
}: {
  children: React.ReactChild
  theme: OptionalTheme
}) => {
  const contextTheme = React.useContext(ThemeContext)

  return (
    <ThemeProvider
      theme={deepmerge(contextTheme, modifiedTheme as RequiredTheme)}
    >
      {children}
    </ThemeProvider>
  )
}

const useTheme = () => React.useContext(ThemeContext)

const getValueWithUnit = (value: string | number) =>
  typeof value === 'number' ? `${value}px` : value

export {
  useTheme,
  themedProperty,
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  getValueWithUnit
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
  export interface SmashingTextareaDefaults {}
  export interface SmashingAlertDefaults {}
  export interface SmashingSelectDefaults {}
  export interface SmashingFormFieldDefaults {}
  export interface SmashingAvatarDefaults {}
  export interface SmashingSpinnerDefaults {}
  export interface SmashingBarChartDefaults {}
  export interface SmashingListDefaults {}
  export interface SmashingPieChartDefaults {}
  export interface SmashingProgressBarChartDefaults {}
  export interface SmashingSpiderChartDefaults {}
  export interface SmashingRadialProgressDefaults {}
  export interface SmashingSideSheetDefaults {}
  export interface SmashingSelectMenuDefaults {}
  export interface SmashingDefaults
    extends SmashingButtonDefaults,
      SmashingCheckboxDefaults,
      SmashingTextInputDefaults,
      SmashingTextareaDefaults,
      SmashingAlertDefaults,
      SmashingBarChartDefaults,
      SmashingListDefaults,
      SmashingPieChartDefaults,
      SmashingSpiderChartDefaults,
      SmashingRadialProgressDefaults,
      SmashingFormFieldDefaults,
      SmashingProgressBarChartDefaults,
      SmashingSideSheetDefaults,
      SmashingSpinnerDefaults,
      SmashingSelectDefaults,
      SmashingSelectMenuDefaults,
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
