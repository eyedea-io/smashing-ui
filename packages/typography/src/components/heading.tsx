import styled, {css} from 'styled-components'
import {getHeadingStyle} from '../styles/headings'

export type HeadingVariant = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export type HeadingFontFamily = 'ui' | 'display' | 'mono'

export interface HeadingProps {
  variant?: HeadingVariant
  fontFamily?: HeadingFontFamily
  marginTop?: number
}

export const Heading = styled.h2<HeadingProps>`
  ${({variant = 400, fontFamily, marginTop}) => css`
    ${getHeadingStyle({variant, fontFamily})}
    ${typeof marginTop === 'number' &&
      css`
        margin-top: ${marginTop}px;
      `};
  `}
`
