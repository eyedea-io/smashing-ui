import styled, {css} from "styled-components"

export interface HeadingProps {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontFamily?: "ui" | "display" | "mono"
}

export const Heading = styled.h2<HeadingProps>`
  ${({size = 400, fontFamily = "display"}) => css`
    ${_ => _.theme.getHeadingStyle(size)}
    font-family: ${_ => _.theme.getFontFamily(fontFamily)};
  `}
`
