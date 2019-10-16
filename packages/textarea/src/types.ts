import {TextInputAppearanceType} from '@smashing/text-input'
import {TextVariant} from '@smashing/typography'

export type TextareaAppearance = TextInputAppearanceType
export type TextareaVariant = TextVariant

export interface TextareaProps extends React.TextareaHTMLAttributes<{}> {
  /**
   * The appearance of the Textarea.
   */
  appearance?: TextareaAppearance

  /**
   * Border radius of Textarea.
   */
  borderRadius?: string | number

  /**
   * Sets visual styling of the text area to be "invalid".
   */
  invalid?: boolean

  /**
   * Allow the Grammarly browser extension to attach to the backing textarea.
   */
  grammarly?: boolean

  /**
   * Control Textarea font size.
   */
  variant?: TextareaVariant

  /**
   * Make textarea full width.
   */
  full?: boolean

  width?: number | string
}
