export type CheckboxAppearanceType = "primary" | "minimal"

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
   * Label of the checkbox.
   */
  label?: string
  /**
   * Apperance of the checkbox.
   * Can be "primary" or "minimal".
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
  // onChange?: Function
}

export type StyledTextProps = CheckboxProps &
  Required<Pick<CheckboxProps, "appearance">>
