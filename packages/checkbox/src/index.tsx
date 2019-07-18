import * as React from "react"
import styled from "styled-components/macro"
import {Text} from "@smashing/typography"
import {getCheckboxStyle} from "./styles"
import {
  useDefaults,
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight
} from "@smashing/theme"
import {CheckboxAppearanceType, CheckboxProps, StyledTextProps} from "./types"

const Label = styled(Text)<StyledTextProps>`
  display: flex;
  align-items:center;
  margin: 0;
  cursor: ${_ => _.disabled ? "not-allowed":"pointer"}
`
const Box = styled.div.attrs({})<StyledTextProps>`
width:16px;
height:16px;
display: flex;
justify-content:center;
margin-right:8px;
align-items:center;
border-radius:4px;
 ${_ => getCheckboxStyle(_.appearance)}
  svg {
    display: flex;
    height: 8px;
  }
`

const CheckIcon = ({fill = "currentColor", ...props}) => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path
      d="M1 3L3 5L7 1"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const CheckboxFC: React.FC<CheckboxProps> = ({children,checked, label, ...props}) => {
  const defaults = useDefaults("checkbox", props, {
    appearance: "minimal" as CheckboxAppearanceType,
    label: "Stay signed in"
  })

  return (
    <Label as="label" {...defaults}>
    <Box appearance={defaults.appearance} >
    {
      checked && <CheckIcon /> 
    }
        
    </Box>
      {defaults.label}
    </Label>
  )
}

const Checkbox = styled(CheckboxFC)``

export {Checkbox, CheckboxProps, CheckboxAppearanceType}

declare module "styled-components" {
  export interface SmashingCheckboxDefaults
    extends Partial<{
      checkbox?: {
        appearance?: CheckboxAppearanceType
        label: string
      }
    }> {}
}
