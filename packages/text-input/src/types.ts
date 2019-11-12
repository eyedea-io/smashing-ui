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
  onClickBefore?: any
  onClickAfter?: any
  /**
   * Sets visual styling of the text area to be "invalid".
   */
  invalid?: boolean
  /**
   * Make input full width.
   */
  full?: boolean
  affixBefore?: React.FC
  affixAfter?: React.FC | string
}

export interface AffixProps {
  component: React.FC<{color: string}> | string
  disabled?: boolean
  height: number | string
  inputRef: React.RefObject<HTMLInputElement>
  invalid?: boolean
  onClickBefore?: (
    inputRef: React.RefObject<HTMLInputElement>,
    props: any
  ) => {}
  onClickAfter?: (inputRef: React.RefObject<HTMLInputElement>, props: any) => {}
  affix?: 'affixBefore' | 'affixAfter'
}
