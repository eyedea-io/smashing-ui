type ProtoExntends<T, U> = U & Omit<T, keyof U>

export type TextInputAppearanceType =
  | 'default'
  | 'neutral'
  | 'minimal'
  | 'underline'
  | 'outline'

export type TextInputType = 'email' | 'password' | 'tel' | 'hidden' | 'text'

export interface TextInputProps extends React.InputHTMLAttributes<{}> {
  appearance?: TextInputAppearanceType
  borderRadius?: number
  type?: TextInputType
  innerRef?: any
  /**q
   * Sets visual styling of the text area to be "invalid".
   */
  invalid?: boolean
  /**
   * Make input full width.
   */
  full?: boolean
  before?: React.FC
  after?: React.FC | string
}

export interface AffixProps {
  component: React.FC<AffixIconComponentProps> | string
  disabled?: boolean
  height: number | string
  inputRef: React.RefObject<HTMLInputElement>
  invalid?: boolean
  affix?: 'before' | 'after'
}

export interface AffixIconComponentProps {
  inputRef?: React.RefObject<HTMLInputElement>
}
