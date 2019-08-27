import {ButtonLikeProps} from '@smashing/button/lib/esm/types'

export type Option = {
  label: string
  value: string
}

export interface SelectProps extends ButtonLikeProps {
  options: Option[]
  selected: string
  onChange: (e) => void
}
