import * as React from "react"
import styled, {css} from "styled-components"
import {theme} from "@smashing/theme"

export interface Props {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  intent?: "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Text: React.FC<Props> = styled.span<Props>`
  ${({size = 400, fontFamily = "ui", color = "default", intent}) => css`
    color: ${theme.getTextColor(intent || color)};
    font-family: ${theme.getFontFamily(fontFamily)};
    ${theme.getTextStyle(size)}
  `}
`
