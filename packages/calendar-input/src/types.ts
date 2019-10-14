export type CalendarInputAppearanceType =
  | 'default'
  | 'neutral'
  | 'minimal'
  | 'underline'
// TODO add `outline` appearance

export type StyledCalendarInputProps = CalendarInputProps & {
  open: boolean
}
export type CalendarInputProps = {
  appearance: CalendarInputAppearanceType
  onChange?: (date: Date) => void
  value?: Date
  locale?: string
}
