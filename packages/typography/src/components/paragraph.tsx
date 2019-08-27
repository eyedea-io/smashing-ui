import styled, {css} from 'styled-components'
import {getParagraphStyle} from '../styles/paragraph'
import {ParagraphVariant, ParagraphColor, ParagraphFontFamily} from '../types'

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
