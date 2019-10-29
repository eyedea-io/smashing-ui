export type TextInputAppearanceType =
  | 'default'
  | 'neutral'
  | 'minimal'
  | 'underline'
  | 'outline'

export type TextInputType = 'email' | 'password' | 'tel' | 'hidden' | 'text'

export type TextInputProps = React.InputHTMLAttributes<{}> & {
  appearance?: TextInputAppearanceType
  borderRadius?: number
  type?: TextInputType
  suffix?: string
  innerRef?: any
  /**
   * Sets visual styling of the text area to be "invalid".
   */
  invalid?: boolean
  /**
   * Make input full width.
   */
  full?: boolean
}
