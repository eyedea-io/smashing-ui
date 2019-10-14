import * as React from 'react'
import {useState, useRef} from 'react'
import getUserLocale from 'get-user-locale'
import {useDefaults} from '@smashing/theme'
import {CalendarInputProps, CalendarInputAppearanceType} from './types'
import {StyledContainer, StyledInput, StyledCalendar} from './styles'
import useOutsideClick from './useOutsideClick'
import {TextInputAppearanceType} from '@smashing/text-input'

const CalendarInput: React.FC<CalendarInputProps> = ({
  onChange = () => {},
  value,
  inputAppearance,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const node = useRef<HTMLDivElement>(null)
  useOutsideClick(node, () => {
    setIsOpen(false)
  })

  const defaults = useDefaults('calendar', props, {
    appearance: 'default' as CalendarInputAppearanceType,
    inputAppearance: 'default' as TextInputAppearanceType
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
    <StyledContainer ref={node}>
      <StyledInput
        appearance={defaults.inputAppearance}
        open={isOpen}
        readOnly
        onFocus={() => setIsOpen(true)}
        value={getFormattedDate()}
      />
      <StyledCalendar
        // TODO: prevLabel, nextLabel - add icons
        {...props}
        onClickDay={onDateChange}
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

export {CalendarInput, CalendarInputProps}

declare module 'styled-components' {
  export interface SmashingCalendarDefaults extends Partial<{}> {}
}
