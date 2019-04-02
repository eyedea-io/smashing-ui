import styled, {css} from "styled-components"
import {getFontFamily} from "../utils"
import {getHeadingStyle} from "../styles/headings"

export interface HeadingProps {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontFamily?: "ui" | "display" | "mono"
}

export const Heading = styled.h2<HeadingProps>`
  ${({size = 400, fontFamily}) => css`
    ${getHeadingStyle(size)}
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
