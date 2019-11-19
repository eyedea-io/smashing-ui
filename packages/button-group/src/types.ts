export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Layout = 'equal' | 'full' | 'default'
export interface ButtonGroupWrapperProps {
  childrenAmount: number
  layout?: Layout
}
export interface ButtonGroupProps {
  options: ButtonGroupRadioProps[]
  onChange: any
  value: any
  center?: boolean
  layout?: Layout
}

export type ButtonGroupRadioProps = PartialBy<
  ButtonGroupProps,
  'options' | 'value'
> & {label: string; checked: boolean}
