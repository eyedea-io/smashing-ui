export type Option = {
  label: string
  value: string
}

export interface SelectProps {
  options: Option[]
  selected: string
  isMultiSelect: boolean
  onSelect: (e) => void
  onDeselect: (e) => void
}

export interface OptionProps {
  item: Option
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void
  isActive: boolean
}
