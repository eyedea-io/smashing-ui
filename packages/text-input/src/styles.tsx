import {DefaultTheme} from 'styled-components'
import {TextInputAppearanceType} from './types'

export const getTextInputStyle = (appearance?: TextInputAppearanceType) => (_: {
  theme: DefaultTheme
}) => {
  const {scales, palette} = _.theme

  switch (appearance) {
    case 'underline':
      return {
        backgroundColor: 'white',
        borderRadius: 0,
        boxShadow: `inset 0 -2px 0 0 ${scales.neutral.N4A}`,
        '&:invalid, &[aria-invalid]': {
          boxShadow: `inset 0 -2px 0 0 ${palette.red.base}`
        },
        ':focus': {
          outline: 'none',
          boxShadow: `inset 0 -2px 0 0 ${scales.blue.B7}`
        },
        '::placeholder': {
          color: scales.neutral.N6A
        },
        ':disabled': {
          boxShadow: `inset 0 -2px 0 0 ${scales.neutral.N2A}`
        }
      }
    case 'minimal':
      return {
        backgroundColor: 'white',
        '&:invalid, &[aria-invalid]': {},
        '::placeholder': {
          color: scales.neutral.N6A
        },
        ':focus': {
          outline: 'none'
        },
        ':disabled': {
          backgroundColor: scales.neutral.N2
        }
      }
    case 'neutral':
      return {
        backgroundColor: scales.neutral.N2A,
        '&:invalid, &[aria-invalid]': {
          boxShadow: `inset 0 0 0 1px ${palette.red.base}`
        },
        '::placeholder': {
          color: scales.neutral.N6A
        },
        ':focus': {
          outline: 'none',
          backgroundColor: 'white',
          boxShadow: `inset 0 0 2px ${scales.neutral.N4A}, inset 0 0 0 1px ${scales.blue.B7}, 0 0 0 3px ${scales.blue.B4A}`
        },
        ':disabled': {
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
          backgroundColor: scales.neutral.N2
        }
      }
    case 'default':
    default:
      return {
        backgroundColor: 'white',
        boxShadow: `inset 0 0 0 1px ${scales.neutral.N5A}, inset 0 1px 2px ${scales.neutral.N4A}`,
        '&:invalid, &[aria-invalid]': {
          boxShadow: `inset 0 0 0 1px ${palette.red.base}, inset 0 1px 2px ${scales.neutral.N4A}`
        },
        ':focus': {
          outline: 'none',
          boxShadow: `inset 0 0 2px ${scales.neutral.N4A}, inset 0 0 0 1px ${scales.blue.B7}, 0 0 0 3px ${scales.blue.B4A}`
        },
        '::placeholder': {
          color: scales.neutral.N6A
        },
        ':disabled': {
          boxShadow: `inset 0 0 0 1px ${scales.neutral.N4A}`,
          backgroundColor: scales.neutral.N2
        }
      }
  }
}
