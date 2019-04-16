import styled, {css} from "styled-components"
import {getTextColor, getFontFamily} from "../utils"
import {getTextStyle} from "../styles/text"

export interface LabelProps {
  variant?: 300 | 400 | 500
  fontFamily?: "ui" | "display" | "mono"
}

export const Label = styled.label<LabelProps>`
  ${({variant = 400, fontFamily}) => css`
    ${getTextStyle(variant)}
    color: ${getTextColor("dark")};
    font-weight: 500;
    ${fontFamily &&
      css`
        font-family: ${getFontFamily(fontFamily)};
      `};
  `}
`
