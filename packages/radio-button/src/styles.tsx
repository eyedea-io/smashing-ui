import {DefaultTheme} from 'styled-components'
import {RadioButtonAppearanceType} from './types'

export const getLabelStyle = (
  appearance: RadioButtonAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'outline':
      console.log('style outline')
      console.log(checked)
      const {
        theme: {
          colors: {border}
        }
      } = _
      return {
        color: checked ? border.active : border.default
      }
    case 'default':
    default:
      return {}
  }
}

export const getRadioButtonStyle = (
  appearance: RadioButtonAppearanceType,
  disabled = false,
  checked = false
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'outline':
      const color = disabled
        ? _.theme.colors.border.muted
        : checked
        ? _.theme.colors.border.active
        : _.theme.colors.border.default
      return {
        '& + div': {
          color,
          border: '2px solid currentColor',
          borderRadius: '100%',
          width: '24px',
          height: '24px',
          ':after': {
            width: '12px',
            height: '12px'
          }
        }
      }
    case 'default':
    default:
      return {
        '& + div': {
          color: _.theme.colors.border.active,
          border: '1px solid currentColor'
        }
      }
  }
}
