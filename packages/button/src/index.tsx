import * as React from "react"
import styled, {css} from "styled-components"
import {theme} from "@smashing/theme"
import {Text} from "@smashing/typography"

export interface ButtonProps {
  height?: number
  intent?: "none" | "success" | "info" | "danger" | "warning"
  appearance?: "primary" | "minimal" | "default" | "flat"
}

const DEFAULT_APPEARANCE = "default"
const DEFAULT_INTENT = "none"
const DEFAULT_HEIGHT = 32
const StyledText = styled(Text)<ButtonProps>`
  border: none;
  border-radius: ${_ => _.theme.radius};
  ${({height = DEFAULT_HEIGHT}) => css`
    height: ${_ => height}px;
    padding-left: ${_ => Math.round(height / 2)}px;
    padding-right: ${_ => Math.round(height / 2)}px;
  `}
  ${({appearance = DEFAULT_APPEARANCE, intent = DEFAULT_INTENT, theme}) =>
    theme.getButtonStyle(appearance, intent)};
`

const Styled: React.FC<ButtonProps> = ({
  children,
  height = DEFAULT_HEIGHT,
  ...props
}) => {
  const textSize = theme.getTextSizeForControlHeight(height)

  return (
    <StyledText as="button" size={textSize} height={height} {...props}>
      {children}
    </StyledText>
  )
}

export const Button = Styled
