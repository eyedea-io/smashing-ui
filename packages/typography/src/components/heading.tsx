import styled, {css} from "styled-components"
import {getFontFamily} from "../utils"
import {getHeadingStyle} from "../styles/headings"

export interface HeadingProps {
  variant?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontFamily?: "ui" | "display" | "mono"
  marginTop?: number
}

export const Heading = styled.h2<HeadingProps>`
  ${({variant = 400, fontFamily, marginTop}) => css`
    ${getHeadingStyle(variant)}
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
    ${marginTop &&
      css`
        margin-top: ${marginTop}px;
      `};
  `}
`
