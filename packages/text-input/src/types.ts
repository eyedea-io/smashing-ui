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
  suffix?: React.FC
  prefix?: React.FC
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
export interface AffixProps {
  component: React.FC<AffixIconProps>
  disabled?: boolean
  height: number | string
  inputRef: React.RefObject<HTMLInputElement>
  invalid?: boolean
  affix?: 'prefix' | 'suffix'
}

export interface AffixIconProps {
  inputRef?: React.RefObject<HTMLInputElement>
  active?: boolean
  toggleActive?: any
  // setActive?: React.SetStateAction<{active: boolean}>
}
