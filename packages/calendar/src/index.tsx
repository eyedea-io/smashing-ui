import * as React from 'react'
import {useState} from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {CalendarProps, CalendarAppearanceType} from './types'
import {StyledContainer, StyledInput, StyledCalendar} from './styles'

const Calendar: React.FC<CalendarProps> = ({
  onChange = () => {},
  startValue,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(startValue)
  const defaults = useDefaults('calendar', props, {
    appearance: 'default' as CalendarAppearanceType
  })

  const getFormattedDate = () => {
    if (!date) {
      return ''
    }
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return `${day > 9 ? day : '0' + day}/${
      month > 9 ? month : '0' + month
    }/${year}`
  }

  const onDateChange = chosenDate => {
    setOpen(false)
    setDate(chosenDate)
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
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        value={getFormattedDate()}
      />
      <StyledCalendar
        // TODO: prevLabel, nextLabel - add icons
        {...props}
        onChange={onDateChange}
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
