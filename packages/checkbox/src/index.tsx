import * as React from "react"
import styled from "styled-components/macro"
import {Text} from "@smashing/typography"
import {getCheckboxStyle, getLabelStyle} from "./styles"
import {useDefaults} from "@smashing/theme"
import {CheckboxAppearanceType, CheckboxProps, StyledTextProps} from "./types"

const Label = styled(Text)<StyledTextProps>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${_ => (_.disabled ? "not-allowed" : "pointer")};
  ${_ => getLabelStyle(_.appearance, _.disabled, _.checked)};
  svg {
    fill: ${_ => (_.checked ? "red" : "blue")};
    padding-right: 8px;
  }
`
const HiddenCheckbox = styled.input.attrs({type: "checkbox"})`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Box = styled.div.attrs({})<StyledTextProps>`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
  border-radius: 4px;
  transition: all 150ms;
  ${_ => getCheckboxStyle(_.appearance, _.disabled, _.checked)};
  svg {
    display: flex;
    height: 8px;
    visibility: ${_ => (_.checked ? "visible" : "hidden")};
  }
`

const CheckIcon = ({fill = "currentColor"}) => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path
      d="M1 3L3 5L7 1"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckboxFC: React.FC<CheckboxProps> = ({children, ...props}) => {
  const defaults = useDefaults("checkbox", props, {
    appearance: "primary" as CheckboxAppearanceType
  })

  return (
    <Label as="label" {...defaults} {...props}>
      <HiddenCheckbox
        checked={props.checked}
        onChange={props.onChange}
        {...props}
      />
      {defaults.appearance === "primary" ||
      defaults.appearance === "minimal" ? (
        <Box
          appearance={defaults.appearance}
          checked={props.checked}
          {...props}
        >
          <CheckIcon />
        </Box>
      ) : null}
      {children}
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
      }
    }> {}
}
