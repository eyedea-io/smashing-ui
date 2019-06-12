export type TextInputAppearanceType =
  | "default"
  | "neutral"
  | "minimal"
  | "underline"
export type TextInputType = "email" | "password" | "tel" | "hidden" | "text"
export interface TextInputProps {
  id?: string
  name?: string
  appearance?: TextInputAppearanceType
  type?: TextInputType
  borderRadius?: number
  height?: number
  width?: number | string
  required?: boolean
  className?: string
  placeholder?: string
  spellCheck?: boolean
  defaultValue?: any
  value?: any
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
export type StyledTextProps = TextInputProps &
  Required<Pick<TextInputProps, "height" | "appearance">>
