import styled, {css} from "styled-components"
import {getTextColor, getFontFamily} from "../utils"
import {getTextStyle} from "../styles/text"

export interface TextProps {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  intent?: "none" | "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Text = styled.span<TextProps>`
  ${({size = 400, fontFamily = "ui", color = "default", intent}) => css`
    ${getTextStyle(size)};
    color: ${getTextColor(intent || color)};
    font-family: ${getFontFamily(fontFamily)};
  `}
`
