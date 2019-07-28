import * as React from "react"
import {useDefaults} from "@smashing/theme"
import {SelectProps, OptionProps, Option} from "./types"
import {Text} from "@smashing/typography"
import {S, CheckIcon, ArrowIcon} from "./styles"
import {Popover} from "@smashing/popover"

const OptionItem: React.FC<OptionProps> = ({item, onClick, isActive}) => (
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

  const [isOpen, setOpen] = React.useState(false)
  const [chosenOption, setChosenOption] = React.useState<Option>(
    options.find(
      item => typeof item !== "string" && item.value === defaultValue
    ) || defaultValue
  )

  const handleOpen = () => setOpen(!isOpen)

  return (
    <Popover
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
      targetOffset={-1}
      onOpen={handleOpen}
      onClose={handleOpen}
      content={() => (
        <S.SelectList>
          {options.map((item, idx) => (
            <OptionItem
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
      <S.SelectButton isOpen={isOpen}>
        <Text>
          {typeof chosenOption === "string" ? chosenOption : chosenOption.label}
        </Text>
        <S.RotateAnimation isOpen={isOpen}>
          <ArrowIcon />
        </S.RotateAnimation>
      </S.SelectButton>
    </Popover>
  )
}

export {Select}

declare module "styled-components" {
  export interface SmashingAlertDefaults
    extends Partial<{
      select?: {
        options: Option[]
        defaultValue: string
        onChange: (e) => void
      }
    }> {}
}
