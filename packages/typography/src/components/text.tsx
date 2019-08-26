import styled, {css} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {getTextStyle} from '../styles/text'

export type TextVariant = 300 | 400 | 500 | 600
export type TextFontFamily = 'ui' | 'display' | 'mono'
export type TextColor = 'muted' | 'default' | 'intense'
export type TextIntent = 'none' | 'success' | 'info' | 'danger' | 'warning'

export interface TextProps {
  variant?: TextVariant
  color?: TextColor
  intent?: TextIntent
  fontFamily?: TextFontFamily
}

export const Text = styled.span<TextProps>`
  ${({variant = 400, fontFamily, color = 'default', intent}) => css`
    ${getTextStyle({variant, intent, color, fontFamily})};
  `}
`
