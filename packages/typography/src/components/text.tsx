import styled, {css} from "styled-components"
import {getTextColor, getFontFamily} from "../utils"
import {getTextStyle} from "../styles/text"

export interface TextProps {
  variant?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  intent?: "none" | "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Text = styled.span<TextProps>`
  ${({variant = 400, fontFamily, color = "default", intent}) => css`
    ${getTextStyle(variant)};
    color: ${getTextColor(intent || color)};
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
