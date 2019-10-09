import * as React from 'react'
import {useState} from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {CalendarProps, CalendarAppearanceType} from './types'
import {StyledContainer, StyledInput, StyledCalendar} from './styles'

const Calendar: React.FC<CalendarProps> = ({
  onChange = () => {},
  value,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const defaults = useDefaults('calendar', props, {
    appearance: 'default' as CalendarAppearanceType
  })

  const getFormattedDate = () => {
    if (!value) {
      return ''
    }
    return value.toLocaleDateString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric'
    })
  }

  const onDateChange = chosenDate => {
    console.log(chosenDate)
    setIsOpen(false)
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
        open={isOpen}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
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
        open={isOpen}
        formatShortWeekday={formatShortWeekday}
      />
    </StyledContainer>
  )
}

export {Calendar, CalendarProps}

declare module 'styled-components' {
  export interface SmashingCalendarDefaults extends Partial<{}> {}
}
