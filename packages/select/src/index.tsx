import * as React from "react"
import {ThemeContext} from "styled-components/macro"
import {useDefaults} from "@smashing/theme"
import {AlertIntentType, AlertAppearanceType} from "./types"
import {Text, Strong} from "@smashing/typography"
import {S, CheckIcon} from "./styles"
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

interface OptionProps {
  item: Option
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void
  isActive: boolean
}

const Option: React.FC<OptionProps> = ({item, onClick, isActive}) => (
  <S.SelectListItem onClick={onClick} isActive={isActive}>
    {isActive && <CheckIcon />}
    <Text color={isActive ? "dark" : "muted"}>
      {typeof item === "string" ? item : item.label}
    </Text>
  </S.SelectListItem>
)

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
    <Popover
      targetOffset={-1}
      content={() => (
        <S.SelectList>
          {options.map((item, idx) => (
            <Option
              key={idx}
              item={item}
              isActive={
                typeof item !== "string"
                  ? item.value === (chosenOption as any).value
                  : item === chosenOption
              }
              onClick={() => setChosenOption(item)}
            />
          ))}
        </S.SelectList>
      )}
    >
      <S.SelectButton>
        <Text color="dark">
          {typeof chosenOption === "string" ? chosenOption : chosenOption.label}
        </Text>
      </S.SelectButton>
    </Popover>
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
