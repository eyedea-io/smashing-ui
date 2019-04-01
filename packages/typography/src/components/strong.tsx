import styled, {css} from "styled-components"

export interface StrongProps {
  size?: 300 | 400 | 500 | 600
  color?: "muted" | "default" | "dark"
  intent?: "success" | "info" | "danger" | "warning"
  fontFamily?: "ui" | "display" | "mono"
}

export const Strong = styled.strong<StrongProps>`
  ${({size = 400, fontFamily = "ui", color = "default", intent}) => css`
    ${_ => _.theme.getTextStyle(size)}
    color: ${_ => _.theme.getTextColor(intent || color)};
    font-family: ${_ => _.theme.getFontFamily(fontFamily)};
    font-weight: 600;
  `}
`
