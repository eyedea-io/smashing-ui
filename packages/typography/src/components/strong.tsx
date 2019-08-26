import styled, {css} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {getTextStyle} from '../styles/text'

export interface StrongProps {
  variant?: 300 | 400 | 500 | 600
  color?: 'muted' | 'default' | 'intense'
  intent?: 'success' | 'info' | 'danger' | 'warning'
  fontFamily?: 'ui' | 'display' | 'mono'
}

export const Strong = styled.strong<StrongProps>`
  ${({variant = 400, fontFamily, color = 'default', intent}) => css`
    ${getTextStyle({variant, intent, color, fontFamily})}
    font-weight: 600;
  `}
`
