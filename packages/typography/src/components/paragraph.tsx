import styled, {css} from "styled-components"

export interface ParagraphProps {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  fontFamily?: "ui" | "display" | "mono"
}

export const Paragraph = styled.p<ParagraphProps>`
  ${({size = 400, fontFamily = "ui", color = "default"}) => css`
    color: ${_ => _.theme.getTextColor(color)};
    font-family: ${_ => _.theme.getFontFamily(fontFamily)};
    ${_ => _.theme.getTextStyle(size)}
  `}
`
