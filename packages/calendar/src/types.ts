export type CalendarAppearanceType = 'outline' | 'default'

export type StyledCalendarProps = CalendarProps & {
  open: boolean
}
export type CalendarProps = {
  appearance: CalendarAppearanceType
  onChange?: (date: Date) => void
  value?: Date
  locale?: string
}
