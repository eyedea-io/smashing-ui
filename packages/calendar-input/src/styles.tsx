import styled from 'styled-components'
import {StyledCalendarInputProps} from './types'
import ReactCalendar from 'react-calendar/dist/entry.nostyle'
import {TextInput} from '@smashing/text-input'

// const getCalendarStyle = (
//   appearance?: CalendarAppearanceType,
//   open?: boolean
// ) => (_: {theme: DefaultTheme}) => {
//   const {colors, palette} = _.theme
//   switch (appearance) {
//     case 'outline':
//       return css`
//         border: 1px solid ${colors.border.default};
//         border-bottom-left-radius: 6px;
//         border-bottom-right-radius: 6px;
//         .react-calendar__month-view__days__day--neighboringMonth,
//         .react-calendar__month-view__weekdays {
//           color: ${colors.text.muted};
//         }
//         ${_ =>
//           open
//             ? {
//                 input: {
//                   borderBottom: `1px solid ${colors.border.muted}`,
//                   borderBottomLeftRadius: 0,
//                   borderBottomRightRadius: 0
//                 }
//               }
//             : {}}
//       `
//   }
//   return {}
// }

// TODO: uncomment when outline appearance will be added to text-input
// ${_ => getCalendarStyle(_.appearance)}

export const StyledCalendar = styled(ReactCalendar)<StyledCalendarInputProps>`
  transition: max-height 0.5s ease, padding-bottom 0.05s ease,
    padding-top 0.05s ease 0.45s;
  overflow: hidden;
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

  ${_ => ({
    ...(_.open
      ? {
          transition: 'max-height 0.5s ease, padding 0.05s linear',
          maxHeight: '300px'
        }
      : {
          pointerEvents: 'none',
          maxHeight: 0,
          padding: '0 12px'
        }),
    '.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active, .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile--active:focus': {
      background: _.theme.colors.text.default,
      color: _.theme.palette.neutral.lightest,
      outline: 0
    },
    '.react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile:hover:not(.react-calendar__tile--active), .react-calendar__tile.react-calendar__month-view__days__day.react-calendar__tile:focus:not(.react-calendar__tile--active)': {
      background: _.theme.colors.text.muted,
      color: _.theme.palette.neutral.lightest,
      outline: 0
    }
  })}
`

export const StyledInput = styled(TextInput)<{open: boolean}>`
  width: 100%;
  box-sizing: border-box;
`

export const StyledContainer = styled.div`
  position: relative;
  width: 200px;
`
