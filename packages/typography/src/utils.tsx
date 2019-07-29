import {DefaultTheme} from "styled-components/macro"
import {themedProperty} from "@smashing/theme"

export interface PaletteColor {
  type: "lightest" | "light" | "base" | "dark"
  color: string
}

export const getTextColor = (color: string) => (_: {theme: DefaultTheme}) =>
  themedProperty(_.theme.colors.text, color)

export const getPaletteColor = ({color, type = "base"}: PaletteColor) => (_: {
  theme: DefaultTheme
}) => themedProperty(_.theme.palette, color)[type]

export const getFontFamily = (fontFamily: string) => (_: {
  theme: DefaultTheme
}) => themedProperty(_.theme.fontFamilies, fontFamily)
