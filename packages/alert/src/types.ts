export declare type IntentType = "success" | "warning" | "info" | "danger"
export declare type AppearanceType = "default" | "inline" | "card"
export type AlertProps = {
  intent?: IntentType
  appearance?: AppearanceType
  title?: React.ReactNode
  children?: React.ReactNode
  hasTrim?: boolean
  hasIcon?: boolean
}
