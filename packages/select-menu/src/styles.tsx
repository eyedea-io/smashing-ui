import styled from 'styled-components'
import {SelectMenuAppearanceType} from './types'
import {TextInput} from '@smashing/text-input'
import {Button} from '@smashing/button'
import {Popover as PopoverElement} from '@smashing/popover'
import {Heading} from '@smashing/typography'

export const OptionDiv = styled.div<{appearance?: string}>`
  padding: ${_ => _.theme.spacing.xxs} 0;
  width: 100%;
  border-bottom: ${_ =>
    _.appearance !== 'card'
      ? `1px solid ${_.theme.scales.neutral.N5}`
      : 'none'};
`

export const Popover = styled(PopoverElement)<{
  appearance?: SelectMenuAppearanceType
  invalid?: boolean
}>``
// FIXME: Handle  styled Popover
// box-sizing: border-box;
// ${_ => getPopoverStyle(_.appearance, _.invalid)}

export const Title = styled(Heading)`
  margin: 0;
`

export const FilterInput = styled(TextInput)`
  width: 100%;
  background-color: ${_ => _.theme.scales.neutral.N2};
  box-shadow: none;

  &::placeholder {
    color: ${_ => _.theme.scales.neutral.N6};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

export const FilterHost = styled.div`
  border-bottom: ${_ => `1px solid ${_.theme.scales.neutral.N5}`};
`
export const PopoverHost = styled.div``

export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${_ => `1px solid ${_.theme.colors.border.default}`};
  padding: ${_ => _.theme.spacing.xxs};
`

interface OptionHostProps {
  appearance?: SelectMenuAppearanceType
  height?: number
}

export const OptionHost = styled.div<OptionHostProps>`
  /* padding: ${_ =>
    _.appearance !== 'card' && _.appearance !== 'outline' ? '4px' : '0'}; */
  /* max-height: ${_ => _.height}px; */
  overflow-y: auto;
  height: 100%;
  position: relative;
`
// FIXME: Remove if unused
// export const SelectButton = styled(Button)`
//   ${_ => _.theme.elevation.card};
// `
export const CloseButton = styled(Button)`
  padding-left: 7px;
  padding-right: 7px;
  svg {
    fill: ${_ => _.theme.scales.neutral.N7};
    width: 12px;
    height: 12px;
  }
`
export const EmptyView = styled.div`
  margin: ${_ => _.theme.spacing.xs} 0;
  display: flex;
  justify-content: center;
  text-align: center;
`

// FIXME: Remove if unused
// export const InputAsSelectButtonComponent = styled(TextInput)<{
//   inputInvalid?: boolean
// }>`
//   cursor: pointer;
//   height: ${_ => _.theme.spacing.xxl};

//   input {
//     font-size: 14px;
//     box-shadow: none;
//     font-weight: 600;
//     border: 1px solid
//       ${_ =>
//         _.inputInvalid
//           ? _.theme.colors.border.danger
//           : _.theme.colors.border.default};
//   }

//   &[aria-expanded='true'] {
//     border-bottom-left-radius: 0;
//     border-bottom-right-radius: 0;
//     transition: border-radius 0.2s ease;
//     input {
//       border-bottom: 1px solid ${_ => _.theme.colors.border.muted};
//     }
//   }
//   &[aria-expanded='false'] {
//     transition: border-radius 0.2s ease 0.2s;
//   }
// `

// FIXME: Remove if unused
// export const getSelectMenuItemStyle = (
//   appearance?: SelectMenuAppearanceType,
//   disabled = false,
//   checked = false
// ) => _ => {
//   switch (appearance) {
//     case 'primary':
//       return {}
//     case 'card':
//       return {
//         boxShadow: 'none',
//         padding: '8px',
//         borderRadius: 0,
//         outline: 'none',
//         '& div': {
//           display: 'flex',
//           justifyContent: 'center',
//           padding: 0
//         },
//         ':focus-within': {
//           boxShadow: 'none'
//         }
//       }
//     case 'outline':
//       return {
//         'div:first-of-type': {
//           display: 'none'
//         },
//         [OptionDiv]: {
//           borderTop: `1px solid ${_.theme.colors.border.muted}`,
//           borderBottom: 'none',
//           padding: '13px 16px',
//           '&:hover': {
//             backgroundColor: _.theme.colors.background.blueTint
//           },
//           ...(checked && {
//             backgroundColor: _.theme.colors.background.blueTint
//           })
//         },
//         '&:first-of-type': {
//           [OptionDiv]: {
//             borderTop: '0'
//           }
//         }
//       }
//     default:
//       return {}
//   }
// }

// FIXME: Remove if unused
// export const getPopoverStyle = (
//   appearance?: SelectMenuAppearanceType,
//   invalid?: boolean
// ) => _ => {
//   switch (appearance) {
//     case 'outline':
//       return {
//         borderRadius: 0,
//         borderBottomLeftRadius: '6px',
//         borderBottomRightRadius: '6px',
//         boxShadow: 'none',
//         border: `1px solid ${
//           invalid ? _.theme.colors.border.danger : _.theme.colors.border.default
//         }`,
//         borderTop: '0',
//         backgroundColor: _.theme.colors.background.default
//       }

//     default:
//       return {}
//   }
// }
