import {ButtonProps} from '@smashing/button'
export interface ButtonGroupOptionProps {
  label: string
  value: any
  onChange: any
  checked: boolean
}

export interface ButtonGroupWrapperProps {
  childrenAmount: number
  layout?: 'equal' | 'full'
}
export interface ButtonGroupProps {
  onChange: any
  options: ButtonGroupOptionProps[]
  value: any
}

export type ExtendedButtonGroupProps = ButtonGroupProps &
  ButtonProps &
  ButtonGroupWrapperProps
