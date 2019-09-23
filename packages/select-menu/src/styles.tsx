import styled from 'styled-components/macro'
import {DefaultTheme} from 'styled-components'
import {Checkbox as SmashingCheckbox} from '@smashing/checkbox'
import {SelectMenuAppearanceType} from './types'
import {TextInput} from '@smashing/text-input'
import {Button} from '@smashing/button'

export const OptionDiv = styled.div<{appearance: string}>`
  padding: 12px 0;
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
        }
      }
    default:
      return {}
  }
}

export const FilterInput = styled(TextInput)`
  width: 100%;
`

export const FilterHost = styled.div``
export const PopoverHost = styled.div``
export const OptionHost = styled.div<{appearance: string}>`
  padding: ${_ => (_.appearance !== 'card' ? '4px' : 'none')};
  overflow-y: auto;
`

export const PopoverFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`
export const Checkbox = styled(SmashingCheckbox)<{
  checked: boolean
  appearance: string
}>`
  ${_ => getSelectMenuItemStyle(_.appearance, _.checked)}
`
export const SelectButton = styled(Button)`
  ${_ => _.theme.elevation.card};
`
