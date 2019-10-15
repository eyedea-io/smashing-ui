import styled, {css} from 'styled-components'
import {getTextStyle} from '../styles/text'
import {TextVariant, TextColor, TextIntent, TextFontFamily} from '../types'

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
