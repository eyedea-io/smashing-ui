export type RadioButtonAppearanceType = 'default' | 'outline'

export interface RadioButtonProps {
  id?: string
  name?: string
  value?: string
  checked?: boolean
  appearance?: RadioButtonAppearanceType
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export type StyledLabelProps = RadioButtonProps &
  Required<Pick<RadioButtonProps, 'appearance'>>
