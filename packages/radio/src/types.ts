export type RadioAppearanceType = 'default' | 'outline'

export interface RadioProps {
  id?: string
  name?: string
  /**
   * Width & height of radio button
   * @default 16
   */
  size?: number
  value?: string | number
  checked?: boolean
  disabled?: boolean
  appearance?: RadioAppearanceType
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
