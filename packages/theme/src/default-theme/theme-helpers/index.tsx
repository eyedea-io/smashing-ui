import {ensureTheme, themedProperty} from "../utils"
import {text} from "../typography"

export const getTextColor = (color: string) =>
  ensureTheme(_ => themedProperty(_.colors.text, color))

export const getFontFamily = (fontFamily: string) =>
  ensureTheme(_ => themedProperty(_.fontFamilies, fontFamily))

export const getTextStyle = (size: number) => themedProperty(text, String(size))
