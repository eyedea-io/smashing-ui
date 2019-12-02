import styled, {DefaultTheme, css} from 'styled-components'
import {StyledCalendarInputProps, CalendarInputAppearanceType} from './types'
import ReactCalendar from 'react-calendar/dist/entry.nostyle'
import {TextInput, TextInputAppearanceType} from '@smashing/text-input'
import {Popover} from '@smashing/popover'
import {Text, Strong} from '@smashing/typography'
import {Button} from '@smashing/button'

const getCalendarStyle = (appearance?: CalendarInputAppearanceType) => (_: {
  theme: DefaultTheme
}) => {
  switch (appearance) {
    case 'outline':
      return css`
        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile {
          border-radius: 100%;
        }
      `
    default:
      return {}
  }
}

const getPopoverStyle = (appearance?: CalendarInputAppearanceType) => {
  if (appearance === 'outline') {
    return css`
      box-shadow: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border: none;
      box-sizing: border-box;
      ${_ => ({
        border: `1px solid ${_.theme.colors.border.active}`,
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
      &[aria-expanded='true'] {
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

  .react-calendar__tile {
    width: 24px;
    height: 24px;
    padding: 0;
    line-height: 12px;
  }

  ${_ => ({
    backgroundColor: _.theme.colors.background.default,
    '.react-calendar__navigation__label': {
      fontWeight: 'bold'
    },
    '.react-calendar__month-view__weekdays, .react-calendar__month-view__days__day--neighboringMonth': {
      fontFamily: _.theme.fontFamilies.ui,
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

export const StyledInput = styled(TextInput)<{
  appearance?: TextInputAppearanceType
}>`
  box-sizing: border-box;
  ${_ => getTextInputStyle(_.appearance)}
`

export const StyledContainer = styled(Popover)<{
  appearance?: CalendarInputAppearanceType
}>`
  ${_ => getPopoverStyle(_.appearance)};
`

export const CalendarContainer = styled.div<{withTime?: boolean}>`
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
    paddingTop: _.theme.spacing.xxs
  })};
`

export const TimePickerHeader = styled(Button)`
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  ${_ => ({
    paddingTop: _.theme.spacing.xxs,
    paddingBottom: _.theme.spacing.xxs,
    borderBottom: `1px solid ${_.theme.colors.border.default}`
  })};
`

export const TimePickerHeaderText = styled(Strong)`
  flex: 1;
`

export const ClockElementButton = styled(Button)`
  width: 100%;
  border: none;
  background: transparent;
  justify-content: center;
  border-radius: 0;
  ${_ => ({
    paddingTop: _.theme.spacing.xxs,
    paddingBottom: _.theme.spacing.xxs,
    borderTop: `1px solid ${_.theme.colors.border.default}`
  })};
`

export const TimeLabel = styled(Text).attrs({
  variant: 300,
  color: 'muted'
})`
  display: block;
  padding: 0 16px;
`

export const TimeButtonsContainer = styled.div`
  margin: ${_ => `0 ${_.theme.spacing.xs}`};
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
