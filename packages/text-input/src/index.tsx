import * as React from "react"
import styled, {css, ThemeContext} from "styled-components"
import {Text} from "@smashing/typography"
import {
  getDefault,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from "@smashing/theme"
import {AppearanceType, TextInputProps} from "./types"
import {getTextInputStyle} from "./styles"

const DEFAULT_APPEARANCE = "default"
const DEFAULT_HEIGHT = 32

const get = {
  height: (value?: number) =>
    getDefault("textInput", "height", DEFAULT_HEIGHT, value),
  appearance: (value?: AppearanceType) =>
    getDefault("textInput", "appearance", DEFAULT_APPEARANCE, value)
}

const StyledText = styled(Text)<TextInputProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  width: ${_ => (typeof _.width === "number" ? `${_.width}px` : _.width)};
  ${({height}) => css`
    height: ${get.height(height)}px;
    padding-left: ${_ => Math.round(get.height(height)(_) / 3.2)}px;
    padding-right: ${_ => Math.round(get.height(height)(_) / 3.2)}px;
  `}
  ${_ => getTextInputStyle(_.appearance)}
`

const TextInput: React.FC<TextInputProps> = ({
  children,
  height,
  disabled,
  type = "text",
  ...props
}) => {
  const theme = React.useContext(ThemeContext)
  const textSize = getTextSizeForControlHeight(get.height(height)({theme}))
  const borderRadius = getBorderRadiusForControlHeight(
    get.height(height)({theme})
  )

  return (
    <StyledText
      as="input"
      variant={textSize}
      height={height}
      type={type}
      borderRadius={borderRadius}
      color={disabled ? "muted" : undefined}
      disabled={disabled}
      {...props}
    />
  )
}

const a = () => <TextInput value="" onChange={e => {}} />

export {TextInput, TextInputProps, AppearanceType}

declare module "styled-components" {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput?: {
        height?: number
        appearance?: AppearanceType
      }
    }> {}
}
