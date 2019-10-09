import styled, {DefaultTheme, css} from 'styled-components'
import {StyledCalendarProps, CalendarAppearanceType} from './types'
import ReactCalendar from 'react-calendar/dist/entry.nostyle'
import {TextInput} from '@smashing/text-input'

const getCalendarStyle = (
  appearance?: CalendarAppearanceType,
  open?: boolean
) => (_: {theme: DefaultTheme}) => {
  const {colors, palette} = _.theme
  return {}
  switch (appearance) {
    // TODO add outline style
    case 'default':
      return css`
        border: 1px solid ${colors.calendar.border.default};
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        .react-calendar__month-view__days__day--neighboringMonth,
        .react-calendar__month-view__weekdays {
          color: ${colors.calendar.text.muted};
        }
        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active,
        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active:focus {
          background: ${colors.calendar.selected};
          color: ${palette.neutral.lightest};
          outline: 0;
        }

        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile:hover:not(.react-calendar__tile--active),
        .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile:focus:not(.react-calendar__tile--active) {
          background: ${colors.calendar.hovered};
          color: ${palette.neutral.lightest};
          outline: 0;
        }
        ${_ =>
          open
            ? {
                input: {
                  borderBottom: `1px solid ${colors.calendar.border.muted}`,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0
                }
              }
            : {}}
      `
  }
}

export const StyledCalendar = styled(ReactCalendar)<StyledCalendarProps>`
  ${_ => getCalendarStyle(_.appearance)}
  ${_ => ({
    opacity: _.open ? 1 : 0
  })};
  transition: opacity 0.5s ease;
  position: absolute;
  right: 0;
  left: 0;
  border-top: none;
  box-sizing: border-box;
  padding: 6px 12px;
  font-size: 12px;
  text-align: center;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    line-height: 20px;
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__navigation {
    padding: 0 5px;
  }

  .react-calendar__tile--now {
    font-weight: bold;
  }

  .react-calendar__tile {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 0;
    line-height: 12px;
  }
`

export const StyledInput = styled(TextInput)<{open: boolean}>`
  width: 100%;
  box-sizing: border-box;
`

export const StyledContainer = styled.div`
  position: relative;
  width: 200px;
`
