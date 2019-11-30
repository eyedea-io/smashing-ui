import * as React from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {TextInputAppearanceType} from '@smashing/text-input'
import {PopoverProps} from '@smashing/popover'
import {CalendarInputProps, CalendarInputAppearanceType} from './types'
import * as S from './styles'
import {DateInput} from './date-input'
import {TimePicker} from './time-picker'

const CalendarInput: React.FC<CalendarInputProps> = ({
  onChange = () => {},
  value,
  withTime,
  ...props
}) => {
  const [timeIsOpen, setTimeIsOpen] = React.useState(false)
  const [timeValue, setTimeValue] = React.useState<{
    minutes?: number
    hours?: number
  }>({
    minutes: undefined,
    hours: undefined
  })

  const defaults = useDefaults('calendar', props, {
    appearance: 'default' as CalendarInputAppearanceType,
    inputAppearance: 'default' as TextInputAppearanceType,
    width: 200,
    hoursLabel: 'Hours',
    minutesLabel: 'Min',
    minutesInterval: 5
  })
  const minutesInterval =
    defaults.minutesInterval < 5 ? 5 : defaults.minutesInterval

  const formatShortWeekday = (locale, formattedDate) => {
    return formattedDate
      .toLocaleString(locale || getUserLocale(), {
        weekday: 'short'
      })
      .slice(0, 2)
  }

  const popoverPropsForAppearance = {
    outline: {
      transitionType: 'expand',
      targetOffset: -1
    } as Partial<PopoverProps>,
    default: {}
  }[defaults.appearance || 'default']

  const changeTimeValue = (hours?: number, minutes?: number) => {
    setTimeValue({minutes, hours})
  }

  return (
    <S.StyledContainer
      position="bottom-left"
      matchTargetWidth
      appearance={defaults.appearance}
      {...popoverPropsForAppearance}
      onCloseComplete={() => setTimeIsOpen(false)}
      content={({close}) => {
        return (
          <S.CalendarContainer>
            <S.StyledCalendar
              open={true}
              {...props}
              onClickDay={date => {
                onChange(date)
                close()
              }}
              value={value}
              appearance={defaults.appearance}
              prev2Label={null}
              next2Label={null}
              onDrillDown={() => null}
              formatShortWeekday={formatShortWeekday}
            />
            {withTime && (
              <S.TimeButton onClick={() => setTimeIsOpen(true)}>
                Time icon
              </S.TimeButton>
            )}
            {timeIsOpen && (
              <TimePicker
                changeTime={changeTimeValue}
                minuteValue={value ? value.getMinutes() : timeValue.minutes}
                hourValue={value ? value.getHours() : timeValue.hours}
                minutesInterval={minutesInterval}
                hoursLabel={defaults.hoursLabel}
                minutesLabel={defaults.minutesLabel}
              />
            )}
          </S.CalendarContainer>
        )
      }}
    >
      {({isShown, toggle, getRef}) => (
        <DateInput
          getRef={getRef}
          openCalendar={() => !isShown && toggle()}
          onClick={toggle}
          onChange={onChange}
          value={value}
          withTime={withTime}
          width={defaults.width}
          minutesInterval={minutesInterval}
          appearance={defaults.inputAppearance}
          timeValue={timeValue}
        />
      )}
    </S.StyledContainer>
  )
}

export {CalendarInput, CalendarInputProps}

declare module 'styled-components' {
  export interface SmashingCalendarDefaults extends Partial<{}> {}
}
