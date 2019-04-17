import * as React from "react"
import styled from "styled-components"
import {Text} from "@smashing/typography"
import {getButtonStyle} from "./styles"
import {
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from "@smashing/theme"
import {IntentType, AppearanceType, ButtonProps, StyledTextProps} from "./types"

const StyledText = styled(Text)<StyledTextProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 2)}px;
  padding-right: ${_ => Math.round(_.height / 2)}px;
  ${_ => getButtonStyle(_.appearance, _.intent)};
`
const ButtonFC: React.FC<ButtonProps> = ({children, ...props}) => {
  const defaults = useDefaults("button", props, {
    height: 32,
    appearance: "default" as AppearanceType,
    intent: "none" as IntentType
  })

  return (
    <StyledText
      as="button"
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      variant={getTextSizeForControlHeight(defaults.height)}
      {...defaults}
      {...props}
    >
      {children}
    </StyledText>
  )
}

const Button = styled(ButtonFC)``

export {Button, ButtonProps, AppearanceType, IntentType}

declare module "styled-components" {
  export interface SmashingButtonDefaults
    extends Partial<{
      button?: {
        height?: number
        appearance?: AppearanceType
        intent?: IntentType
      }
    }> {}
}
