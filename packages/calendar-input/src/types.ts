import {TextInputAppearanceType, TextInputProps} from '@smashing/text-input'
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
  clockIcon?: React.FC
  nextIcon?: JSX.Element
  prevIcon?: JSX.Element
  expandIcon?: React.FC
  collapseIcon?: React.FC
}

export type TimePickerProps = {
  hoursLabel: string
  minutesLabel: string
  minutesInterval: number
  hourValue?: number
  minuteValue?: number
  changeTime: (hours?: number, minutes?: number) => void
  clockIcon: React.FC
  header: string
  close: () => void
  collapseIcon?: React.FC
}

export type DateInputProps = Pick<
  CalendarInputProps,
  'onChange' | 'value' | 'withTime'
> &
  Pick<TextInputProps, 'appearance' | 'onClick' | 'width'> & {
    getRef: (ref: HTMLElement | null) => void
    openCalendar: () => void
    minutesInterval: number
    timeValue: {
      hours?: number
      minutes?: number
    }
    isExpanded?: boolean
    expandIcon?: React.FC
    collapseIcon?: React.FC
  }
