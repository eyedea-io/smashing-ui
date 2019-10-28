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

export type ButtonIconPosition = 'left' | 'center' | 'right'

export interface ButtonLikeProps {
  intent?: ButtonIntentType
  appearance?: ButtonAppearanceType
  disabled?: boolean
  tabIndex?: number
  className?: string
  innerRef?: any
  height?: number
  id?: string
  name?: string
  /** Make button full width */
  full?: boolean
}

export interface ButtonProps extends ButtonLikeProps {
  type?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isLoading?: boolean
  borderRadius?: number
  icon?: any
}

export type StyledTextProps = ButtonProps &
  Required<Pick<ButtonProps, 'height' | 'appearance' | 'intent'>>

export type StyledSpinnerProps = {
  marginRight?: number
  marginLeft?: number
  iconPosition?: 'left' | 'center'
  height: number
}
