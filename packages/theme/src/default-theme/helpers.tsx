import {themedProperty} from "../utils/themed-property"
import {getButtonStyle} from "./components/button"
import {DefaultTheme} from "styled-components"

export const getTextColor = (color: string) => (_: {theme: DefaultTheme}) =>
  themedProperty(_.theme.colors.text, color)

export const getFontFamily = (fontFamily: string) => (_: {
  theme: DefaultTheme
}) => themedProperty(_.theme.fontFamilies, fontFamily)

export const getTextStyle = (size: number) => (_: {theme: DefaultTheme}) =>
  themedProperty(_.theme.style.text, String(size))

export const getHeadingStyle = (size: number) => (_: {theme: DefaultTheme}) =>
  themedProperty(_.theme.style.headings, String(size))

export const getTextSizeForControlHeight = (height: number) => {
  if (height <= 24) return 300
  if (height <= 28) return 300
  if (height <= 32) return 300
  if (height <= 36) return 400
  if (height <= 40) return 400

  return 500
}

export const helpers = {
  getTextColor,
  getFontFamily,
  getTextStyle,
  getHeadingStyle,
  getTextSizeForControlHeight,
  getButtonStyle
}
