import styled from 'styled-components/macro'
import {DefaultTheme} from 'styled-components'
import {Checkbox as SmashingCheckbox} from '@smashing/checkbox'
import {SelectMenuAppearanceType} from './types'
import {TextInput} from '@smashing/text-input'

// import styled, {DefaultTheme} from 'styled-components/macro'
// import {
//   ButtonAppearanceType,
//   ButtonIntentType,
//   ButtonAs
// } from '@smashing/button'
// import {SelectProps} from './types'

// type StyledSelectProps = Pick<SelectProps, 'appearance' | 'intent' | 'full'>
export const OptionDiv = styled.div<{
  appearance: string
}>`
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
  const disabledAppearance = {
    opacity: 0.8,
    backgroundImage: 'none',
    backgroundColor: `${_ => _.theme.scales.neutral.N2A}`,
    color: `${_ => _.theme.scales.neutral.N7}`
  }

  switch (appearance) {
    case 'primary':
      return {}
    case 'card':
      // const theme = colors.checkbox[appearance]
      // const backgroundIsTransparent = theme.backgroundColor === 'transparent'
      // const flat = {
      //   color: theme.color,
      //   backgroundColor: {
      //     base: theme.backgroundColor,
      //     hover: backgroundIsTransparent
      //       ? scales.neutral.N2A
      //       : tinycolor(theme.backgroundColor)
      //           .setAlpha(0.8)
      //           .toString(),
      //     active: backgroundIsTransparent
      //       ? scales.blue.B3A
      //       : tinycolor(theme.backgroundColor)
      //           .darken()
      //           .desaturate()
      //           .toString()
      //   },
      //   focusColor: backgroundIsTransparent
      //     ? scales.blue.B4A
      //     : tinycolor(theme.backgroundColor)
      //         .setAlpha(0.4)
      //         .toString()
      // }

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
        // '& + div': {
        //   color: flat.color,
        //   boxShadow: checked
        //     ? `inset 0 0 0 1px ${colors.checkbox.minimal.color}`
        //     : `inset 0 0 0 1px ${scales.neutral.N6}`,
        //   backgroundColor: flat.backgroundColor.base,
        //   fontWeight: 600
        // },
        // ':hover:not([disabled]) + div': {
        //   backgroundColor: flat.backgroundColor.hover
        // },
        ':focus': {
          outline: 'none',
          boxShadow: 'none',
          backgroundColor: `${_ => _.theme.scales.neutral.N2A}`
        },
        ':active': {
          backgroundColor: `${_ => _.theme.scales.neutral.N2A}`,
          boxShadow: 'none'
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
export const OptionHost = styled.div<{
  appearance: string
}>`
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
