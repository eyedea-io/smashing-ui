import {ButtonLikeProps, ButtonAppearanceType} from '@smashing/button'
import {TextInputAppearanceType} from '@smashing/text-input'

export type SelectAppearanceType = ButtonAppearanceType

export type Option = {
  label: string
  value: string
}

export interface SelectProps extends ButtonLikeProps {
  appearance?: SelectAppearanceType
  options?: Option[]
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement> | string) => void
  defaultValue?: string
  placeholder?: string
}
