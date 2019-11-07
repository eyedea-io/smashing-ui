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
  suffix?: TextInputAffixProps
  prefix?: TextInputAffixProps
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

export interface TextInputAffixProps {
  icon: any
  activeIcon?: any
  onClick?: any
}

export interface AffixProps {
  activeIcon?: any
  disabled?: boolean
  height: number | string
  icon: any
  inputRef: any
  invalid?: boolean
  onClick?: any
  affix?: 'prefix' | 'suffix'
}
