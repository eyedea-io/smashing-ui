import {ButtonLikeProps} from '@smashing/button'

export type Option = {
  label: string
  value: string
}

export interface SelectProps extends ButtonLikeProps {
  options: Option[]
  selected: string
  onChange: (value: string) => void
}
