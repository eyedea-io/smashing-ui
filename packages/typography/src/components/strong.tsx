import styled, {css} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {getTextStyle} from '../styles/text'

export interface StrongProps {
  variant?: 300 | 400 | 500 | 600
  color?: 'muted' | 'default' | 'dark'
  intent?: 'success' | 'info' | 'danger' | 'warning'
  fontFamily?: 'ui' | 'display' | 'mono'
}

export const Strong = styled.strong<StrongProps>`
  ${({variant = 400, fontFamily, color = 'default', intent}) => css`
    ${getTextStyle(variant)}
    color: ${getTextColor(intent || color)};
    font-weight: 600;
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
