import * as React from "react"
import {ThemeContext} from "styled-components/macro"
import {useDefaults} from "@smashing/theme"
import {AlertIntentType, AlertAppearanceType} from "./types"
import {Text, Strong} from "@smashing/typography"
import {} from "./styles"
import {Button} from "@smashing/button"
import {Popover} from "@smashing/popover"

type Option =
  | {
      label: string
      value: string
    }
  | string

interface SelectProps {
  options: Option[]
  defaultValue: string
  onChange: (e) => void
}

const SelectOptions = props => {
  return (
    <ul>
      {props.options.map((item, idx) =>
        typeof item === "string" ? (
          <div key={idx} onClick={() => props.onClick(item)}>
            {item}
          </div>
        ) : (
          <div key={idx} onClick={() => props.onClick(item)}>
            {item.label}
          </div>
        )
      )}
    </ul>
  )
}

const Select: React.FC<SelectProps> = ({children, ...props}) => {
  const {options, defaultValue} = useDefaults<SelectProps>("select", props, {
    options: [],
    defaultValue: "",
    onChange: () => undefined
  })

  const theme = React.useContext(ThemeContext)

  const [chosenOption, setChosenOption] = React.useState<Option>(
    options.find(
      item => typeof item !== "string" && item.value === defaultValue
    ) || defaultValue
  )

  return (
    <>
      <Popover
        content={() => (
          <SelectOptions options={options} onClick={setChosenOption} />
        )}
        position="top"
      >
        <Button>
          {typeof chosenOption === "string" ? chosenOption : chosenOption.label}
        </Button>
      </Popover>
    </>
  )
}

export {Select}

declare module "styled-components" {
  export interface SmashingAlertDefaults
    extends Partial<{
      select?: {
        intent?: AlertIntentType
        appearance?: AlertAppearanceType
        hasTrim: boolean
        hasIcon: boolean
      }
    }> {}
}
