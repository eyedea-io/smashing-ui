import {ButtonAppearanceType} from '@smashing/button'
import {RadioAppearanceType} from '@smashing/radio'
import {CheckboxAppearanceType} from '@smashing/checkbox'

export type Layout = 'default' | 'equal' | 'full'
export type TextAlign = 'left' | 'center' | 'right'

export type ControlAppearanceType = ButtonAppearanceType | RadioAppearanceType | CheckboxAppearanceType

export type ControlGroupAppearanceType =
  | 'button'
  | 'radio-horizontal'
  | 'radio-vertical'
  | 'checkbox-vertical'
  | 'checkbox-horizontal'

export interface ControlProps {
  value?: string
  label: string
}

export interface StyledButtonProps {
  checked: boolean
  activeGroup: boolean
  textAlign?: TextAlign
}
export interface ControlGroupWrapperProps {
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  childrenAmount: number
  layout?: Layout
  isOpen?: boolean
}
export interface ControlGroupProps {
  items: ControlProps[]
  value: string | string[]
  onChange: (value: string) => void
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  layout?: Layout
  textAlign?: TextAlign
  disabled?: boolean
  invalid?: boolean
  height?: number
  visibleCount?: number
}
