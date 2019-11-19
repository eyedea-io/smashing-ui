export interface Option {
  label: string
  value: any
  onChange: any
  checked: boolean
}

export interface ButtonGroupProps {
  onChange: any
  options: Option[]
  value: any
}
