import * as React from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {TextInputAppearanceType} from '@smashing/text-input'
import {PopoverProps} from '@smashing/popover'
import {CalendarInputProps, CalendarPopoverAppearanceType} from './types'
import * as S from './styles'
import {DateInput} from './date-input'
import {TimePicker} from './time-picker'
import {ClockIcon, CalendarIcon} from './icons'

const CalendarInput: React.FC<CalendarInputProps> = ({
  onChange = () => {},
  value,
  hasTime,
  clockIcon = <ClockIcon />,
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

  const defaults = useDefaults('calendarInput', props, {
    popoverAppearance: 'default' as CalendarPopoverAppearanceType,
    inputAppearance: 'default' as TextInputAppearanceType,
    height: 32,
    width: 200,
    hoursLabel: 'Hours',
    minutesLabel: 'Min',
    minutesInterval: 5,
    iconAfter: ({isShown}) => <CalendarIcon isShown={isShown} />
  })

  React.useEffect(() => {
    if (value) {
      onChange(getDateAndTimeValue(value))
    }
  }, [timeValue])

  const minutesInterval =
    defaults.minutesInterval < 5 ? 5 : defaults.minutesInterval

  const formatShortWeekday = (locale, formattedDate) => {
    return formattedDate
      .toLocaleString(locale || getUserLocale(), {
        weekday: 'short'
      })
      .slice(0, 2)
  }

  const getDateAndTimeValue = date => {
    const newValue = new Date(date)
    newValue.setHours(timeValue.hours || newValue.getHours())
    newValue.setMinutes(timeValue.minutes || newValue.getMinutes())
    return newValue
  }

  const popoverPropsForAppearance = {
    dropdown: {
      transitionType: 'expand',
      targetOffset: -1
    } as Partial<PopoverProps>,
    card: {}
  }[defaults.popoverAppearance || 'card']

  const changeTimeValue = (hours?: number, minutes?: number) => {
    setTimeValue({minutes, hours})
  }

  return (
    <S.StyledContainer
      position="bottom-left"
      matchTargetWidth
      minHeight={timeIsOpen ? 240 : undefined}
      appearance={defaults.popoverAppearance}
      {...popoverPropsForAppearance}
      onCloseComplete={() => setTimeIsOpen(false)}
      content={({close}) => {
        return (
          <S.CalendarContainer>
            <S.StyledCalendar
              {...props}
              onClickDay={date => {
                onChange(getDateAndTimeValue(date))
                if (!hasTime) {
                  close()
                }
              }}
              value={value}
              appearance={defaults.popoverAppearance}
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
            {hasTime && (
              <S.ClockButton
                visible={!timeIsOpen}
                appearance="minimal"
                onClick={() => setTimeIsOpen(true)}
              >
                {clockIcon}
              </S.ClockButton>
            )}

            <TimePicker
              isOpen={timeIsOpen}
              header={timeHeader}
              close={() => setTimeIsOpen(false)}
              clockIcon={clockIcon}
              changeTime={changeTimeValue}
              minuteValue={value ? value.getMinutes() : timeValue.minutes}
              hourValue={value ? value.getHours() : timeValue.hours}
              minutesInterval={minutesInterval}
              hoursLabel={defaults.hoursLabel}
              minutesLabel={defaults.minutesLabel}
            />
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
          hasTime={hasTime}
          height={defaults.height}
          width={defaults.width}
          minutesInterval={minutesInterval}
          appearance={defaults.inputAppearance}
          timeValue={timeValue}
          iconAfter={defaults.iconAfter}
        />
      )}
    </S.StyledContainer>
  )
}

export {CalendarInput, CalendarInputProps}

declare module 'styled-components' {
  export interface SmashingCalendarInputDefaults
    extends Partial<{
      calendarInput: Pick<
        CalendarInputProps,
        | 'height'
        | 'width'
        | 'inputAppearance'
        | 'popoverAppearance'
        | 'hoursLabel'
        | 'minutesLabel'
        | 'minutesInterval'
        | 'iconAfter'
      >
    }> {}
}
