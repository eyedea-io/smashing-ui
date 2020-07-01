import {RefObject} from 'react'

export type TextInputAppearanceType =
  | 'default'
  | 'neutral'
  | 'minimal'
  | 'underline'
  | 'outline'

export type TextInputType = 'email' | 'password' | 'tel' | 'hidden' | 'text'

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  appearance?: TextInputAppearanceType
  borderRadius?: number
  type?: TextInputType
  containerRef?: RefObject<HTMLDivElement>
  ref?: RefObject<HTMLInputElement>
  /**
   * Sets visual styling of the text area to be "invalid".
   */
  invalid?: boolean
  /**
   * Make input full width.
   */
  full?: boolean
  /**
   * Affixes props
   */
  affixBefore?: React.FC | string
  affixAfter?: React.FC | string
  onClickBefore?: (
    inputRef?: React.Ref<HTMLInputElement>,
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void
  onClickAfter?: (
    inputRef?: React.Ref<HTMLInputElement>,
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void
}

export interface TextInputAffixProps {
  isBefore?: boolean
  component: React.FC<{color: string}> | string
  disabled?: boolean
  height: number | string
  inputRef: React.Ref<HTMLInputElement>
  invalid?: boolean
  onClickBefore?: (
    inputRef: React.Ref<HTMLInputElement>,
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void
  onClickAfter?: (
    inputRef: React.Ref<HTMLInputElement>,
    event?: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void
}
