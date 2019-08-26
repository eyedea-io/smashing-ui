import styled, {css} from 'styled-components'
import {getTextColor, getFontFamily} from '../utils'
import {getParagraphStyle} from '../styles/paragraph'

export type ParagraphVariant = 300 | 400 | 500
export type ParagraphColor = 'muted' | 'default' | 'intense'
export type ParagraphFontFamily = 'ui' | 'display' | 'mono'

export interface ParagraphProps {
  variant?: ParagraphVariant
  color?: ParagraphColor
  fontFamily?: ParagraphFontFamily
  marginTop?: number
}
export const Paragraph = styled.p<ParagraphProps>`
  ${({variant = 400, fontFamily, color = 'default', marginTop}) => css`
    ${getParagraphStyle({variant, color, fontFamily})};
    ${typeof marginTop === 'number' &&
      css`
        margin-top: ${marginTop}px;
      `};
  `}
`
