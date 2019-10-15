import {ButtonLikeProps} from '@smashing/button'

export type Option = {
  label: string
  value: string
}

export interface SelectProps extends ButtonLikeProps {
  options?: Option[]
  value?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  defaultValue?: string
}
