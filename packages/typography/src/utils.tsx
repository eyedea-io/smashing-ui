import {DefaultTheme} from 'styled-components'
import {themedProperty} from '@smashing/theme'

export const getTextColor = (color: string) => (_: {theme: DefaultTheme}) =>
  themedProperty(_.theme.colors.text, color)

export const getFontFamily = (fontFamily: string) => (_: {
  theme: DefaultTheme
}) => themedProperty(_.theme.fontFamilies, fontFamily)
