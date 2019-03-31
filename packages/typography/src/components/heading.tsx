import styled, {css} from "styled-components"
import {theme} from "@smashing/theme"

export interface HeadingProps {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontFamily?: "ui" | "display" | "mono"
}

export const Heading: React.FC<HeadingProps> = styled.h2<HeadingProps>`
  ${({size = 400, fontFamily = "display"}) => css`
    ${theme.getHeadingStyle(size)}
    font-family: ${theme.getFontFamily(fontFamily)};
  `}
`
