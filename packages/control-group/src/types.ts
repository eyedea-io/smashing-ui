import {ButtonAppearanceType} from '@smashing/button'
import {RadioAppearanceType} from '@smashing/radio'
import {CheckboxAppearanceType} from '@smashing/checkbox'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Layout = 'default' | 'equal' | 'full'
export type TextAlign = 'left' | 'center' | 'right'

export type ControlAppearanceType =
  | ButtonAppearanceType
  | RadioAppearanceType
  | CheckboxAppearanceType

export type ControlGroupAppearanceType =
  | 'button'
  | 'radio-horizontal'
  | 'radio-vertical'
  | 'checkbox-vertical'
  | 'checkbox-horizontal'

export interface ControlGroupWrapperProps {
  appearance: ControlGroupAppearanceType
  childrenAmount: number
  layout?: Layout
}
export interface ControlGroupProps {
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  value: string | string[]
  onValueChange: (value?: string | string[]) => void
  items: ControlProps[]

  textAlign?: TextAlign
  layout?: Layout
}

export type ControlProps = PartialBy<ControlGroupProps, 'items' | 'value'> & {
  appearance: ControlAppearanceType

  label: string
  checked: boolean
}

export interface StyledButtonProps {
  checked: boolean
  textAlign?: TextAlign
}
