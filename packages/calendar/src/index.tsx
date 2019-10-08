import * as React from 'react'
import {useState} from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {CalendarProps, CalendarAppearanceType} from './types'
import {StyledContainer, StyledInput, StyledCalendar} from './styles'

const Calendar: React.FC<CalendarProps> = ({
  onChange = (date: Date) => {},
  value,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const defaults = useDefaults('calendar', props, {
    appearance: 'default' as CalendarAppearanceType
  })

  const getTwoDigitNumber = variable => {
    return variable > 9 ? variable : '0' + variable
  }

  const getFormattedDate = () => {
    if (!value) {
      return ''
    }
    const day = value.getDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()

    return `${getTwoDigitNumber(day)}/${getTwoDigitNumber(month)}/${year}`
  }

  const onDateChange = chosenDate => {
    setOpen(false)
    onChange(chosenDate)
  }

  const formatShortWeekday = (locale, formattedDate) => {
    return formattedDate
      .toLocaleString(locale || getUserLocale(), {
        weekday: 'short'
      })
      .slice(0, 2)
  }

  return (
    <StyledContainer>
      <StyledInput
        // TODO add appearance for input
        open={open}
        placeholder="DD/MM/YY"
        readOnly
        onClick={() => setOpen(!open)}
        value={getFormattedDate()}
      />
      <StyledCalendar
        // TODO: prevLabel, nextLabel - add icons
        {...props}
        onChange={onDateChange}
        value={value}
        appearance={defaults.appearance}
        prev2Label={null}
        next2Label={null}
        open={open}
        onActiveDateChange={onDateChange}
        formatShortWeekday={formatShortWeekday}
      />
    </StyledContainer>
  )
}

export {Calendar, CalendarProps}

declare module 'styled-components' {
  export interface SmashingCalendarDefaults extends Partial<{}> {}
}
