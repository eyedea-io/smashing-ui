export declare type AlertIntentType = 'success' | 'warning' | 'info' | 'danger'
export declare type AlertAppearanceType = 'default' | 'inline' | 'card'
export type AlertProps = {
  intent?: AlertIntentType
  appearance?: AlertAppearanceType
  title?: React.ReactNode
  children?: React.ReactNode
  hasTrim?: boolean
  hasIcon?: boolean
  className?: string
}
