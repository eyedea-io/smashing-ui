import {TextInputAppearanceType, TextInputProps} from '@smashing/text-input'
export type CalendarPopoverAppearanceType = 'card' | 'dropdown'

export type StyledCalendarInputProps = {
  appearance: CalendarPopoverAppearanceType
}
export type CalendarInputProps = {
  popoverAppearance: CalendarPopoverAppearanceType
  inputAppearance?: TextInputAppearanceType
  onChange?: (date?: Date) => void
  height?: number
  width?: number
  value?: Date
  hasTime?: boolean
  hoursLabel?: string
  minutesLabel?: string
  minutesInterval?: number
  clockIcon?: JSX.Element
  nextIcon?: JSX.Element
  prevIcon?: JSX.Element
  iconAfter?: React.FC<{toggle: () => void; isShown: boolean}>
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
  Pick<TextInputProps, 'appearance' | 'width' | 'height'> & {
    getRef: (ref: HTMLElement | null) => void
    onClick: () => void
    openCalendar: () => void
    minutesInterval: number
    timeValue: {
      hours?: number
      minutes?: number
    }
    isExpanded?: boolean
    iconAfter?: React.FC<{toggle: () => void; isShown: boolean}>
  }