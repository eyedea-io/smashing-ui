export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Layout = 'default' | 'equal' | 'full'
export type TextAlign = 'left' | 'center' | 'right'

export interface ButtonGroupWrapperProps {
  childrenAmount: number
  layout?: Layout
}
export interface ButtonGroupProps {
  options: ButtonGroupRadioProps[]
  onChange: any
  value: any
  textAlign?: TextAlign
  layout?: Layout
}

export type ButtonGroupRadioProps = PartialBy<
  ButtonGroupProps,
  'options' | 'value'
> & {label: string; checked: boolean}

export interface StyledButtonProps {
  checked: boolean
  textAlign?: TextAlign
}
