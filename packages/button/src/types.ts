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
  | 'outline'

export interface ButtonLikeProps {
  intent?: ButtonIntentType
  disabled?: boolean
  tabIndex?: number
  className?: string
  innerRef?: any
  height?: number
  width?: number
  id?: string
  name?: string
  /** Make button full width */
  full?: boolean
  invalid?: boolean
}

export interface ButtonProps extends ButtonLikeProps {
  appearance?: ButtonAppearanceType
  type?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  borderRadius?: number
  iconAfter?: React.ElementType
  iconBefore?: React.ElementType
}

export type StyledTextProps = ButtonProps &
  Required<Pick<ButtonProps, 'height' | 'appearance' | 'intent'>>

export type StyledSpinnerProps = {
  marginRight?: number
  marginLeft?: number
  height: number
}
