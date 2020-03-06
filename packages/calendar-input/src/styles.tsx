import styled, {DefaultTheme, css} from 'styled-components'
import {StyledCalendarInputProps, CalendarPopoverAppearanceType} from './types'
import ReactCalendar from 'react-calendar/dist/entry.nostyle'
import {TextInput, TextInputAppearanceType} from '@smashing/text-input'
import {Popover} from '@smashing/popover'
import {Text, Strong} from '@smashing/typography'
import {Button} from '@smashing/button'

const getCalendarStyle = (appearance?: CalendarPopoverAppearanceType) => (_: {
  theme: DefaultTheme
}) => {
  switch (appearance) {
    case 'dropdown':
      return css`
        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile {
          border-radius: 100%;
        }
      `
    default:
      return {}
  }
}

const getPopoverStyle = (
  appearance?: CalendarPopoverAppearanceType,
  invalid?: boolean
) => {
  if (appearance === 'dropdown') {
    return css`
      box-shadow: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border: none;
      box-sizing: border-box;
      ${_ => ({
        border: `1px solid ${
          _.theme.colors.border[invalid ? 'danger' : 'active']
        }`,
        borderTop: `1px solid ${_.theme.colors.border.default}`,
        borderBottomLeftRadius: _.theme.radius,
        borderBottomRightRadius: _.theme.radius
      })}
    `
  }
  return {}
}

const getTextInputStyle = (appearance?: TextInputAppearanceType) => {
  if (appearance === 'outline') {
    return css`
      transition: border-radius 0.3s ease;
      &[aria-expanded='true'],
      & > [aria-expanded='true'] {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    `
  }
  return {}
}

export const StyledCalendar = styled(ReactCalendar)<StyledCalendarInputProps>`
  padding: 8px;
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 12px;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    line-height: 20px;
    abbr {
      text-decoration: none;
      font-size: 12px;
    }
  }

  .react-calendar__navigation {
    padding: 0 5px 8px;
  }

  .react-calendar__tile--now {
    font-weight: bold;
  }

  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--hasActive,
  .react-calendar__tile--active {
    background: #66788a;
    color: #f9f9fb;
    outline: 0;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background: #66788a;
    color: #f9f9fb;
    outline: 0;
  }

  .react-calendar__tile {
    width: 24px;
    height: 24px;
    padding: 0;
    line-height: 12px;
  }

  ${_ => ({
    fontFamily: _.theme.fontFamilies.ui,
    color: _.theme.colors.text.default,
    backgroundColor: _.theme.colors.background.default,
    button: {
      fontFamily: 'inherit',
      color: 'inherit'
    },
    '.react-calendar__navigation__label': {
      color: _.theme.colors.text.intense,
      fontWeight: 'bold'
    },
    '.react-calendar__month-view__weekdays, .react-calendar__month-view__days__day--neighboringMonth': {
      color: _.theme.colors.text.muted
    },
    '.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active, .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active:focus': {
      background: _.theme.colors.text.default,
      color: _.theme.palette.neutral.lightest,
      outline: 0
    },
    '.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile': {
      width: _.theme.spacing.md,
      height: _.theme.spacing.md
    },
    '.react-calendar__tile.react-calendar__tile:hover:not(.react-calendar__tile--active)': {
      background: _.theme.colors.text.muted,
      color: _.theme.palette.neutral.lightest,
      outline: 0
    }
  })}
  ${_ => getCalendarStyle(_.appearance)}
`
interface StyledInputProps {
  appearance?: TextInputAppearanceType
}
export const StyledInput = styled(TextInput)<StyledInputProps>`
  box-sizing: border-box;
  svg {
    box-sizing: content-box;
  }
  ${_ => getTextInputStyle(_.appearance)}
`

interface StyledContainerProps {
  appearance?: CalendarPopoverAppearanceType
  invalid?: boolean
}
export const StyledContainer = styled(Popover)<StyledContainerProps>`
  ${_ => getPopoverStyle(_.appearance, _.invalid)};
`

export const CalendarContainer = styled.div<{hasTime?: boolean}>`
  position: relative;
`

export const TimePicker = styled.div<{isOpen?: boolean}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: height 0.5s ease;
  ${_ => ({
    height: _.isOpen ? '100%' : 0,
    backgroundColor: _.theme.colors.background.default
  })}
`

export const ClockElement = styled.div`
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  ${_ => ({
    color: _.theme.colors.icon.default,
    paddingTop: _.theme.spacing.xxs
  })};
`

export const TimePickerHeader = styled(Button)<{
  visible?: boolean
}>`
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  ${_ => ({
    borderBottom: `1px solid ${_.theme.colors.border.default}`,
    ...(!_.visible && {
      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      }
    })
  })};
`

export const TimePickerHeaderText = styled(Strong)`
  flex: 1;
`

export const ClockButton = styled(Button)<{
  visible?: boolean
}>`
  width: 100%;
  border: none;
  background: transparent;
  justify-content: center;
  border-radius: 0;
  ${_ => ({
    color: _.theme.colors.icon.default,
    paddingTop: _.theme.spacing.xxs,
    paddingBottom: _.theme.spacing.xxs,
    borderTop: `1px solid ${_.theme.colors.border.default}`,
    ...(!_.visible && {
      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      }
    })
  })};
`

export const TimeLabel = styled(Text).attrs({
  variant: 300,
  color: 'muted'
})`
  display: block;
  max-width: 144px;
  margin: 0 auto;
  padding: 0 ${_ => _.theme.spacing.xxs};
`

export const TimeButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 2px;
  max-width: 154px;
  margin: 0 auto;
  padding: 0 ${_ => _.theme.spacing.xxs};
`

export const TimePickButton = styled(Text).attrs({
  variant: 300
})<{active?: boolean}>`
  border-radius: 100%;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  ${_ => ({
    ...(_.active
      ? {
          background: _.theme.colors.text.default,
          color: _.theme.palette.neutral.lightest,
          outline: 0
        }
      : {
          '&:hover': {
            background: _.theme.colors.text.muted,
            color: _.theme.palette.neutral.lightest,
            outline: 0
          }
        })
  })}
`
