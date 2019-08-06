import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {SelectProps, OptionProps, Option} from './types'
import {Text} from '@smashing/typography'
import {S, CheckIcon} from './styles'
import {Popover} from '@smashing/popover'

const OptionItem: React.FC<OptionProps> = ({item, onClick, isActive}) => (
  <S.SelectListItem onClick={onClick} isActive={isActive}>
    {isActive && <CheckIcon />}
    <Text color={isActive ? 'dark' : 'muted'}>{item.label}</Text>
  </S.SelectListItem>
)

const getDefaultOptions = (
  options: any,
  selected: string | string[],
  isMultiSelect: boolean
) => {
  if (isMultiSelect) {
    return options.map(item => selected.includes(item.value)) || []
  }

  return (
    options.find(item => item.value === selected) || {
      label: 'Select',
      value: ''
    }
  )
}

const Select: React.FC<SelectProps> = ({children, ...props}) => {
  const defaults = useDefaults<SelectProps>('select', props, {
    options: [],
    selected: '',
    isMultiSelect: false,
    onSelect: () => undefined,
    onDeselect: () => undefined
  })

  const [isOpen, setIsOpen] = React.useState(false)
  const [chosenOption, setChosenOption] = React.useState<Option | Option[]>(
    getDefaultOptions(
      defaults.options,
      defaults.selected,
      defaults.isMultiSelect
    )
  )

  const handleOpen = () => setIsOpen(!isOpen)
  const handleSelect = React.useCallback(
    item => {
      if (defaults.isMultiSelect && Array.isArray(chosenOption)) {
        const isChosen = chosenOption.some(
          option => option.value === item.value
        )

        if (isChosen) {
          defaults.onDeselect(item)
          setChosenOption(
            chosenOption.filter(option => option.value !== item.value)
          )
        } else {
          defaults.onSelect(item)
          setChosenOption([...chosenOption, item])
        }
      } else {
        defaults.onDeselect(chosenOption)
        defaults.onSelect(item)
        setChosenOption(item)
      }
    },
    [chosenOption]
  )

  return (
    <Popover
      onOpen={handleOpen}
      onClose={handleOpen}
      content={() => (
        <S.SelectList>
          {defaults.options.map((item, idx) => (
            <OptionItem
              key={idx}
              item={item}
              isActive={
                Array.isArray(chosenOption)
                  ? chosenOption.some(({value}) => value === item.value)
                  : item.value === chosenOption.value
              }
              onClick={() => handleSelect(item)}
            />
          ))}
        </S.SelectList>
      )}
    >
      {children}
    </Popover>
  )
}

export {Select}

declare module 'styled-components' {
  export interface SmashingAlertDefaults
    extends Partial<{
      select?: {
        options: Option[]
        defaultValue: string
        onChange: (e) => void
      }
    }> {}
}
