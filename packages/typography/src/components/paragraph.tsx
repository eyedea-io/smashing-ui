import styled, {css} from "styled-components"
import {theme} from "@smashing/theme"

export interface ParagraphProps {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  fontFamily?: "ui" | "display" | "mono"
}

export const Paragraph: React.FC<ParagraphProps> = styled.p<ParagraphProps>`
  ${({size = 400, fontFamily = "ui", color = "default"}) => css`
    color: ${theme.getTextColor(color)};
    font-family: ${theme.getFontFamily(fontFamily)};
    ${theme.getTextStyle(size)}
  `}
`
