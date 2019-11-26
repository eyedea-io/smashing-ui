export interface SearchHeaderProps {
  /**
   * The value of the input.
   */
  value?: string

  /**
   * Handler to be called when the input changes.
   */
  onChange?: () => void

  /**
   * Sets whether the component should be automatically focused on component render.
   */
  autoFocus?: boolean

  /**
   * Text to display in the input if the input is empty.
   */
  placeholder?: string

  /**
   * Icon to display in the input.
   */
  icon?: string
}
