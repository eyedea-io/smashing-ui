import * as React from 'react'
import * as tinycolor from 'tinycolor2'
import {DefaultTheme} from 'styled-components'

export type IntentType = 'success' | 'warning' | 'info' | 'danger' | 'none'

export const getRowAppearance = (intent: IntentType = 'none') => (_: {
  theme: DefaultTheme
}) => {
  const {scales, palette} = _.theme
  switch (intent) {
    case 'danger':
      return {
        backgroundColor: palette.red.lightest,
        ':hover': {
          backgroundColor: tinycolor(palette.red.lightest)
            .darken(1)
            .toString()
        },
        ':focus': {
          backgroundColor: tinycolor(palette.red.lightest)
            .darken(1.5)
            .toString()
        },
        ':active': {
          backgroundColor: tinycolor(palette.red.lightest)
            .darken(2.2)
            .toString()
        }
      }
    case 'warning':
      return {
        backgroundColor: palette.orange.lightest,
        ':hover': {
          backgroundColor: tinycolor(palette.orange.lightest)
            .darken(1)
            .toString()
        },
        ':focus': {
          backgroundColor: tinycolor(palette.orange.lightest)
            .darken(1.5)
            .toString()
        },
        ':active': {
          backgroundColor: tinycolor(palette.orange.lightest)
            .darken(2.5)
            .toString()
        }
      }
    case 'success':
      return {
        backgroundColor: palette.green.lightest,
        ':hover': {
          backgroundColor: tinycolor(palette.green.lightest)
            .darken(1)
            .toString()
        },
        ':focus': {
          backgroundColor: tinycolor(palette.green.lightest)
            .darken(2)
            .toString()
        },
        ':active': {
          backgroundColor: tinycolor(palette.green.lightest)
            .darken(3)
            .toString()
        }
      }
    case 'none':
    default:
      return {
        ':hover': {backgroundColor: scales.neutral.N1A},
        ':focus': {backgroundColor: scales.blue.B1A},
        ':active': {backgroundColor: scales.blue.B2A}
      }
  }
}
