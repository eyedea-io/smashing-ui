import {ButtonAppearanceType} from '@smashing/button'
import {RadioAppearanceType} from '@smashing/radio'
import {CheckboxAppearanceType} from '@smashing/checkbox'

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

export interface ControlItemProps {
  value: string
  label: string
  disabled?: boolean
}

export interface ControlProps {
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  item: ControlItemProps
  textAlign?: TextAlign
  disabled?: boolean
  invalid?: boolean
  height?: number
  value: string | string[]
  onChange: (value: any) => void
  isOpen?: boolean
}

export interface ControlGroupProps
  extends Omit<ControlProps, 'item' | 'isOpen'> {
  items: ControlItemProps[]
  layout?: Layout
  visibleCount?: number
}

export interface ButtonProps {
  checked: boolean
  activeGroup?: boolean
  textAlign?: TextAlign
  isOpen?: boolean
  invalid?: boolean
  disabled?: boolean
}
export interface WrapperProps {
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  childrenAmount: number
  layout?: Layout
  isOpen?: boolean
  visibleItemsCount?: number
  hasMoreButton?: boolean
  width?: number | null
}

export interface SelectProps {
  isOpen?: boolean
}