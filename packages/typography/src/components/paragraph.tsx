import styled, {css} from "styled-components"
import {getTextColor, getFontFamily} from "../utils"
import {getParagraphStyle} from "../styles/paragraph"

export interface ParagraphProps {
  size?: 300 | 400 | 500
  color?: "muted" | "default" | "dark"
  fontFamily?: "ui" | "display" | "mono"
}
export const Paragraph = styled.p<ParagraphProps>`
  ${({size = 400, fontFamily, color = "default"}) => css`
    ${getParagraphStyle(size)};
    color: ${getTextColor(color)};
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
