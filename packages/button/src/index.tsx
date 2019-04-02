import * as React from "react"
import styled, {css, ThemeContext} from "styled-components"
import {Text} from "@smashing/typography"
import {getButtonStyle} from "./styles"
import {getTextSizeForControlHeight, getDefault} from "@smashing/theme"
import {IntentType, AppearanceType} from "./types"

const DEFAULT_APPEARANCE = "default"
const DEFAULT_INTENT = "none"
const DEFAULT_HEIGHT = 32

const get = {
  height: (value?: number) =>
    getDefault("button", "height", DEFAULT_HEIGHT, value),
  appearance: (value?: AppearanceType) =>
    getDefault("button", "appearance", DEFAULT_APPEARANCE, value),
  intent: (value?: IntentType) =>
    getDefault("button", "intent", DEFAULT_INTENT, value)
}

const StyledText = styled(Text)<ButtonProps>`
  border: none;
  border-radius: ${_ => _.theme.radius};
  ${({height}) => css`
    height: ${get.height(height)}px;
    padding-left: ${_ => Math.round(get.height(height)(_) / 2)}px;
    padding-right: ${_ => Math.round(get.height(height)(_) / 2)}px;
  `}
  ${({appearance, intent, theme}) =>
    getButtonStyle(
      get.appearance(appearance)({theme}),
      get.intent(intent)({theme})
    )};
`

const Button: React.FC<ButtonProps> = ({children, height, ...props}) => {
  const theme = React.useContext(ThemeContext)
  const textSize = getTextSizeForControlHeight(get.height(height)({theme}))

  return (
    <StyledText as="button" size={textSize} height={height} {...props}>
      {children}
    </StyledText>
  )
}

export interface ButtonProps {
  height?: number
  intent?: IntentType
  appearance?: AppearanceType
}

export {Button, AppearanceType, IntentType}

declare module "styled-components" {
  export interface DefaultTheme {
    defaults?: {
      button?: {
        height?: number
        appearance?: AppearanceType
        intent?: IntentType
      }
    }
  }
}
