import * as React from "react"
import styled from "styled-components"
import {Text} from "@smashing/typography"
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from "@smashing/theme"
import {AppearanceType, TextInputProps, StyledTextProps} from "./types"
import {getTextInputStyle} from "./styles"

const StyledText = styled(Text)<StyledTextProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  width: ${_ => (typeof _.width === "number" ? `${_.width}px` : _.width)};
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 3.2)}px;
  padding-right: ${_ => Math.round(_.height / 3.2)}px;
  ${_ => getTextInputStyle(_.appearance)}
`
const TextInput: React.FC<TextInputProps> = React.forwardRef(
  ({children, ...props}, ref: any) => {
    const defaults = useDefaults("textInput", props, {
      height: 32,
      appearance: "default" as AppearanceType
    })

    return (
      <StyledText
        as="input"
        ref={ref}
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? "muted" : undefined}
        {...defaults}
      />
    )
  }
)

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
