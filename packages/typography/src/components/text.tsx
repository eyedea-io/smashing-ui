import styled, {css} from "styled-components"
import {theme} from "@smashing/theme"

export interface TextProps {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  intent?: "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Text: React.FC<TextProps> = styled.span<TextProps>`
  ${({size = 400, fontFamily = "ui", color = "default", intent}) => css`
    ${theme.getTextStyle(size)}
    color: ${theme.getTextColor(intent || color)};
    font-family: ${theme.getFontFamily(fontFamily)};
  `}
`
