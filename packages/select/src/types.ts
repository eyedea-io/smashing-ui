export type Option =
  | {
      label: string
      value: string
    }
  | string

export interface SelectProps {
  options: Option[]
  defaultValue: string
  onChange: (e) => void
}

export interface OptionProps {
  item: Option
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void
  isActive: boolean
}
