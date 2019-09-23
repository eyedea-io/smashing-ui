import styled from 'styled-components/macro'
import {DefaultTheme} from 'styled-components'
import {Checkbox as SmashingCheckbox} from '@smashing/checkbox'
import {SelectMenuAppearanceType} from './types'
import {TextInput} from '@smashing/text-input'

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
  // const disabledAppearance = {
  //   opacity: 0.8,
  //   backgroundImage: 'none',
  //   backgroundColor: `${_ => _.theme.scales.neutral.N2A}`,
  //   color: `${_ => _.theme.scales.neutral.N7}`
  // }

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
        // '& + div': {
        //   color: flat.color,
        //   boxShadow: checked
        //     ? `inset 0 0 0 1px ${colors.checkbox.minimal.color}`
        //     : `inset 0 0 0 1px ${scales.neutral.N6}`,
        //   backgroundColor: flat.backgroundColor.base,
        //   fontWeight: 600
        // },
        // ':hover': {
        //   backgroundColor: `${_.theme.scales.neutral.N2}`
        // }
        // ':focus': {
        //   outline: 'none',
        //   boxShadow: 'none',
        //   backgroundColor: 'red'
        // },
        // ':active': {
        //   backgroundColor: 'red',
        //   boxShadow: 'none'
        // }
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
