import styled from 'styled-components/macro'

// import styled, {DefaultTheme} from 'styled-components/macro'
// import {
//   ButtonAppearanceType,
//   ButtonIntentType,
//   ButtonAs
// } from '@smashing/button'
// import {SelectProps} from './types'

// type StyledSelectProps = Pick<SelectProps, 'appearance' | 'intent' | 'full'>

// const getSelectTextStyle = (
//   appearance?: ButtonAppearanceType,
//   intent: ButtonIntentType = 'none'
// ) => (_: {theme: DefaultTheme}) => {
//   const {colors} = _.theme
//   switch (appearance) {
//     case 'primary':
//       return {
//         color: 'white'
//       }
//     case 'flat':
//     case 'minimal':
//     case 'subtle':
//       const theme =
//         colors.button[appearance][intent] || colors.button[appearance].info
//       return {
//         color: theme.color
//       }
//     case 'default':
//     default:
//       return {
//         color: colors.text[intent]
//       }
//   }
// }

// export const S = {
//   SelectWrapper: styled.div<StyledSelectProps>`
//     position: relative;

//     ${_ =>
//       _.full
//         ? {
//             display: 'inline-block',
//             width: '100%'
//           }
//         : {
//             display: 'inline-flex'
//           }}

//     &::before,
//     &::after {
//       position: absolute;
//       pointer-events: none;
//       top: 50%;
//       right: 8px;
//       font-size: 6px;
//       ${_ => getSelectTextStyle(_.appearance, _.intent)};
//     }

//     &::before {
//       content: '\u25B2';
//       transform: translate(0, -100%);
//     }
//     &::after {
//       content: '\u25BC';
//     }
//   `,
//   SelectButtonComponent: styled(ButtonAs<HTMLSelectElement>('select'))`
//     -webkit-appearance: button;
//     padding-right: ${_ => Math.round(_.height)}px;
//   `
// }

export const OptionDiv = styled.div`
  padding: 12px 0;
  width: 100%;
  border-bottom: 1px solid #eee;
`

export const FilterInput = styled.input`
  background-color: #ccc;
  width: 100%;
  padding: 8px;
  border: 0;
`

export const FilterHost = styled.div``
export const PopoverHost = styled.div``
export const OptionHost = styled.div`
  padding: 4px;
`

export const PopoverFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`
