export type CheckboxAppearanceType = 'primary' | 'minimal' | 'card'

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
   * Can be "primary", "minimal" or "card".
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  innerRef?: any
}

export type StyledLabelProps = CheckboxProps &
  Required<Pick<CheckboxProps, 'appearance'>>
