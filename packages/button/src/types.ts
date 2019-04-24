import * as React from "react"

export type IntentType = "success" | "warning" | "info" | "danger" | "none"

export type AppearanceType =
  | "flat"
  | "primary"
  | "minimal"
  | "default"
  | "subtle"

export interface ButtonProps {
  id?: string
  name?: string
  type?: string
  height?: number
  intent?: IntentType
  appearance?: AppearanceType
  className?: string
  borderRadius?: number
  innerRef?: any
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  tabIndex?: number
}
export type StyledTextProps = ButtonProps & {} & Required<
    Pick<ButtonProps, "height" | "appearance" | "intent">
  >
