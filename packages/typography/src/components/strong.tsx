import styled, {css} from 'styled-components'
import {getTextStyle} from '../styles/text'
import {
  StrongVariant,
  StrongColor,
  StrongIntent,
  StrongFontFamily
} from '../types'

export interface StrongProps {
  variant?: StrongVariant
  color?: StrongColor
  intent?: StrongIntent
  fontFamily?: StrongFontFamily
}

export const Strong = styled.strong<StrongProps>`
  ${({variant = 400, fontFamily, color = 'default', intent}) => css`
    ${getTextStyle({variant, intent, color, fontFamily})}
    font-weight: 600;
  `}
`
