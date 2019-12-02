import * as React from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {TextInputAppearanceType} from '@smashing/text-input'
import {PopoverProps} from '@smashing/popover'
import {CalendarInputProps, CalendarInputAppearanceType} from './types'
import * as S from './styles'
import {DateInput} from './date-input'
import {TimePicker} from './time-picker'
import {ClockIcon} from './icons'

const CalendarInput: React.FC<CalendarInputProps> = ({
  onChange = () => {},
  value,
  withTime,
  timeIcon = <ClockIcon />,
  nextIcon,
  prevIcon,
  ...props
}) => {
  const [timeIsOpen, setTimeIsOpen] = React.useState(false)
  const [timeHeader, setTimeHeader] = React.useState(
    `${new Date().toLocaleString('default', {
      month: 'long'
    })} ${new Date().getFullYear()}`
  )

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
      minHeight={timeIsOpen ? 240 : undefined}
      appearance={defaults.appearance}
      {...popoverPropsForAppearance}
      onCloseComplete={() => setTimeIsOpen(false)}
      content={({close}) => {
        return (
          <S.CalendarContainer>
            <S.StyledCalendar
              {...props}
              onClickDay={date => {
                onChange(date)
                if (!withTime) {
                  close()
                }
              }}
              value={value}
              appearance={defaults.appearance}
              prevLabel={prevIcon}
              prev2Label={null}
              nextLabel={nextIcon}
              next2Label={null}
              onActiveDateChange={params =>
                setTimeHeader(
                  `${params.activeStartDate.toLocaleDateString('default', {
                    month: 'long'
                  })} ${params.activeStartDate.getFullYear()}`
                )
              }
              formatShortWeekday={formatShortWeekday}
            />
            {withTime && (
              <S.ClockElementButton
                appearance="minimal"
                onClick={() => setTimeIsOpen(true)}
              >
                {timeIcon}
              </S.ClockElementButton>
            )}
            <S.TimePicker isOpen={timeIsOpen}>
              <TimePicker
                header={timeHeader}
                close={() => setTimeIsOpen(false)}
                timeIcon={timeIcon}
                changeTime={changeTimeValue}
                minuteValue={value ? value.getMinutes() : timeValue.minutes}
                hourValue={value ? value.getHours() : timeValue.hours}
                minutesInterval={minutesInterval}
                hoursLabel={defaults.hoursLabel}
                minutesLabel={defaults.minutesLabel}
              />
            </S.TimePicker>
          </S.CalendarContainer>
        )
      }}
    >
      {({isShown, toggle, getRef}) => (
        <DateInput
          isExpanded={isShown}
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
