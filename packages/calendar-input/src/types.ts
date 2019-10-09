export type CalendarAppearanceType =
  | 'default'
  | 'neutral'
  | 'minimal'
  | 'underline'
// TODO add `outline` appearance

export type StyledCalendarProps = CalendarProps & {
  open: boolean
}
export type CalendarProps = {
  appearance: CalendarAppearanceType
  onChange?: (date: Date) => void
  value?: Date
  locale?: string
}
