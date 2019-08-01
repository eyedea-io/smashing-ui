import {TextProps} from '@smashing/typography'

export interface TextAreaProps extends TextProps {
  /**
   * Makes the textarea element required.
   */
  required?: boolean

  /**
   * Makes the textarea element disabled.
   */
  disabled?: boolean

  /**
   * Sets visual styling of _only_ the text area to be "invalid".
   * Note that this does not effect any `validationMessage`.
   */
  isInvalid?: boolean

  /**
   * Use the native spell check functionality of the browser.
   */
  spellCheck?: boolean

  /**
   * The placeholder text when there is no value present.
   */
  placeholder?: string

  /**
   * The appearance of the TextInput.
   */
  appearance?: string

  /**
   * The width of the TextInput.
   */
  width?: string | number

  /**
   * The height of the TextInput.
   */
  height?: number

  /**
   * Class name passed to the button.
   * Only use if you know what you are doing.
   */
  className?: string

  /**
   * Component styles
   * Only use if you know what you are doing.
   */
  styles?: React.CSSProperties
}
