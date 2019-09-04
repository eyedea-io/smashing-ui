import styled, {css} from 'styled-components'
import {getHeadingStyle} from '../styles/headings'
import {HeadingVariant, HeadingFontFamily} from '../types'

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
