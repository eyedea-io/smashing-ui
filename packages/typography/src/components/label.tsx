import styled, {css} from "styled-components"
import {getTextColor, getFontFamily} from "../utils"
import {getTextStyle} from "../styles/text"

export interface LabelProps {
  variant?: 300 | 400 | 500
  color?: "muted" | "default" | "dark"
  intent?: "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Label = styled.label<LabelProps>`
  ${({variant = 400, fontFamily, color = "default", intent}) => css`
    ${getTextStyle(variant)}
    color: ${getTextColor(intent || color)};
    font-weight: 600;
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
