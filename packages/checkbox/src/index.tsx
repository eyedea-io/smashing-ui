import * as React from "react"
import styled from "styled-components/macro"
import {Text} from "@smashing/typography"
import {getCheckboxStyle} from "./styles"
import {
  useDefaults
} from "@smashing/theme"
import {CheckboxAppearanceType, CheckboxProps, StyledTextProps} from "./types"

const Label = styled(Text)<StyledTextProps>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${_ => (_.disabled ? "not-allowed" : "pointer")};
`
const Box = styled.div.attrs({})<StyledTextProps>`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
  border-radius: 4px;
  ${_ => getCheckboxStyle(_.appearance,_.disabled,_.checked)};
  svg {
    display: flex;
    height: 8px;
    visibility: ${_ => (_.checked ? 'visible' : 'hidden')}
  }
`

const CheckIcon = ({fill = "currentColor"}) => (
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

const CheckboxFC: React.FC<CheckboxProps> = ({
  children,
  label,
  ...props
}) => {
  const defaults = useDefaults("checkbox", props, {
    appearance: "primary" as CheckboxAppearanceType,
    label: "Stay signed in"
  })

  return (
    <Label as="label" {...defaults} {...props}>
      <Box appearance={defaults.appearance} {...props}><CheckIcon /></Box>
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
