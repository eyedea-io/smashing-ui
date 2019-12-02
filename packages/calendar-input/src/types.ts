import {TextInputAppearanceType} from '@smashing/text-input'
export type CalendarInputAppearanceType = 'default' | 'outline'

export type StyledCalendarInputProps = {
  appearance: CalendarInputAppearanceType
}
export type CalendarInputProps = {
  appearance: CalendarInputAppearanceType
  inputAppearance?: TextInputAppearanceType
  onChange?: (date: Date) => void
  value?: Date
  withTime?: boolean
  hoursLabel?: string
  minutesLabel?: string
  minutesInterval?: number
  timeIcon?: JSX.Element
  nextIcon?: JSX.Element
  prevIcon?: JSX.Element
  downIcon?: JSX.Element
  upIcon?: JSX.Element
}
