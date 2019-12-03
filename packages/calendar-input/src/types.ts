import {TextInputAppearanceType, TextInputProps} from '@smashing/text-input'
export type CalendarInputAppearanceType = 'default' | 'outline'

export type StyledCalendarInputProps = {
  appearance: CalendarInputAppearanceType
}
export type CalendarInputProps = {
  popoverAppearance: CalendarInputAppearanceType
  inputAppearance?: TextInputAppearanceType
  onChange?: (date?: Date) => void
  value?: Date
  hasTime?: boolean
  hoursLabel?: string
  minutesLabel?: string
  minutesInterval?: number
  clockIcon?: JSX.Element
  nextIcon?: JSX.Element
  prevIcon?: JSX.Element
  expandIcon?: React.FC
  collapseIcon?: React.FC
}

export type TimePickerProps = {
  isOpen: boolean
  hoursLabel: string
  minutesLabel: string
  minutesInterval: number
  hourValue?: number
  minuteValue?: number
  changeTime: (hours?: number, minutes?: number) => void
  clockIcon?: JSX.Element
  header: string
  close: () => void
  collapseIcon?: React.FC
}

export type DateInputProps = Pick<
  CalendarInputProps,
  'onChange' | 'value' | 'hasTime'
> &
  Pick<TextInputProps, 'appearance' | 'width'> & {
    getRef: (ref: HTMLElement | null) => void
    onClick: () => void
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
