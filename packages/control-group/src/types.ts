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

export interface ControlGroupWrapperProps {
  appearance: ControlGroupAppearanceType
  childrenAmount: number
  layout?: Layout
}
export interface ControlGroupProps {
  controlAppearance: ControlAppearanceType
  groupAppearance: ControlGroupAppearanceType
  value: string | string[]
  onChange: (value: string) => void
  items: ControlProps[]

  textAlign?: TextAlign
  layout?: Layout
}

export interface ControlProps {
  value?: string
  label: string
  checked: boolean
  textAlign?: TextAlign
  handleSelect: (value: string | string[]) => void
}

export interface StyledButtonProps {
  checked: boolean
  textAlign?: TextAlign
}

export type ControlComponentProps<T> = React.FC<ControlProps & T>
