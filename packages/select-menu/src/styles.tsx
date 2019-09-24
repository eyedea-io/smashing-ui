import styled from 'styled-components/macro'
import {DefaultTheme} from 'styled-components'
import {Checkbox as SmashingCheckbox} from '@smashing/checkbox'
import {SelectMenuAppearanceType} from './types'
import {TextInput} from '@smashing/text-input'
import {Button} from '@smashing/button'

export const OptionDiv = styled.div<{appearance: string}>`
  padding: ${_ => _.theme.spacing.xxs} 0;
  width: 100%;
  border-bottom: ${_ =>
    _.appearance !== 'card'
      ? `1px solid ${_.theme.scales.neutral.N5}`
      : 'none'};
`

export const getSelectMenuItemStyle = (
  appearance: SelectMenuAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'primary':
      return {}
    case 'card':
      return {
        boxShadow: 'none',
        padding: '8px',
        borderRadius: 0,
        outline: 'none',
        '& div': {
          display: 'flex',
          justifyContent: 'center',
          padding: 0
        },
        ':focus-within': {
          boxShadow: 'none'
        }
      }
    default:
      return {}
  }
}

export const FilterInput = styled(TextInput)`
  width: 100%;
  background-color: ${_ => _.theme.scales.neutral.N2};
  border-bottom: ${_ => `1px solid ${_.theme.scales.neutral.N5}`};
  border-top: ${_ => `1px solid ${_.theme.scales.neutral.N5}`};
  box-shadow: none;
  :focus {
    outline: none;
    box-shadow: none;
  }
`

export const FilterHost = styled.div``
export const PopoverHost = styled.div``

export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${_ => _.theme.spacing.xxs};
`
// eslint-disable-next-line no-unexpected-multiline
export const Checkbox = styled(SmashingCheckbox)<{
  checked: boolean
  appearance: string
}>`
  ${_ => getSelectMenuItemStyle(_.appearance, _.checked)}
`
export const OptionHost = styled.div<{appearance: string}>`
  padding: ${_ => (_.appearance !== 'card' ? '4px' : 'none')};
  overflow-y: auto;
  ${Checkbox}:last-child {
    ${OptionDiv} {
      border-bottom: none;
    }
  }
`
export const SelectButton = styled(Button)`
  ${_ => _.theme.elevation.card};
`
export const CloseButton = styled(Button)`
  padding-left: 7px;
  padding-right: 7px;
  svg {
    fill: ${_ => _.theme.scales.neutral.N7};
    width: 12px;
    height: 12px;
  }
`
export const TextContainer = styled.div`
  margin-top: ${_ => _.theme.spacing.xxs};
  display: flex;
  justify-content: center;
  text-align: center;
`
