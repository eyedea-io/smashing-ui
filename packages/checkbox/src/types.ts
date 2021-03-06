export type CheckboxAppearanceType =
  | 'primary'
  | 'minimal'
  | 'card'
  | 'outline'
  | 'toggle'

export interface CheckboxProps {
  /**
   * The id attribute of the checkbox.
   */
  id?: string
  /**
   * The name of the checkbox.
   */
  name?: string
  /**
   * Appearance of the checkbox.
   * Can be "primary", "minimal", "card", "outline" or "toggle"
   */
  appearance?: CheckboxAppearanceType
  /**
   * The checked attribute of the checkbox.
   */
  checked?: boolean
  /**
   * When true checkbox is disabled.
   */
  disabled?: boolean
  /**
   * Function called when state changes.
   */
  invalid?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  containerRef?: any
  className?: string
  value?: string | number
  children?: React.ReactNode
}

export type StyledLabelProps = Pick<CheckboxProps, 'disabled' | 'checked'> &
  Required<Pick<CheckboxProps, 'appearance'>>
