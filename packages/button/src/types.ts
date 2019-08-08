import * as React from 'react'

export type ButtonIntentType =
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'none'

export type ButtonAppearanceType =
  | 'flat'
  | 'primary'
  | 'minimal'
  | 'default'
  | 'subtle'

export interface ButtonProps {
  id?: string
  name?: string
  type?: string
  height?: number
  intent?: ButtonIntentType
  appearance?: ButtonAppearanceType
  className?: string
  borderRadius?: number
  innerRef?: any
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  tabIndex?: number
}

export type StyledTextProps = ButtonProps &
  Required<Pick<ButtonProps, 'height' | 'appearance' | 'intent'>>
