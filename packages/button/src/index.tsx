import * as React from "react"
import styled from "styled-components/macro"
import {Text} from "@smashing/typography"
import {Spinner} from "@smashing/spinner"
import {getButtonStyle} from "./styles"
import {
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from '@smashing/theme'
import {
  ButtonIntentType,
  ButtonAppearanceType,
  ButtonProps,
  StyledTextProps
} from './types'

const StyledText = styled(Text)<StyledTextProps>`
  border: none;
  cursor: pointer;
  border-radius: ${_ => _.borderRadius}px;
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 2)}px;
  padding-right: ${_ => Math.round(_.height / 2)}px;
  ${_ => getButtonStyle(_.appearance, _.intent)};
`
const ButtonFC: React.FC<ButtonProps> = ({children, innerRef, ...props}) => {
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: "default" as ButtonAppearanceType,
    intent: "none" as ButtonIntentType,
    isLoading: false
  })

  return (
    <>
    {
      defaults.isLoading ? <Spinner /> :
    <StyledText
      as="button"
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      variant={getTextSizeForControlHeight(defaults.height)}
      ref={innerRef}
      {...defaults}
      {...props}
    >
      {children}
    </StyledText>
    }
    </>
  )
}

const Button = styled(ButtonFC)``

export {Button, ButtonProps, ButtonAppearanceType, ButtonIntentType}

declare module 'styled-components' {
  export interface SmashingButtonDefaults
    extends Partial<{
      button?: {
        height?: number
        appearance?: ButtonAppearanceType
        intent?: ButtonIntentType,
        isLoading?: boolean
      }
    }> {}
}
