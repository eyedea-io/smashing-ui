import {TextInputAppearanceType} from '@smashing/text-input'
export type CalendarInputAppearanceType = 'default' | 'outline'

export type StyledCalendarInputProps = {
  appearance: CalendarInputAppearanceType
  open: boolean
}
export type CalendarInputProps = {
  appearance: CalendarInputAppearanceType
  inputAppearance?: TextInputAppearanceType
  onChange?: (date: Date) => void
  value?: Date
  locale?: string
}
