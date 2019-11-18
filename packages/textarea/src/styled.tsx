import styled, {DefaultTheme} from 'styled-components'
import {getTextInputStyle} from '@smashing/text-input'
import {TextareaProps, TextareaAppearance} from './types'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'

type InputProps = TextareaProps &
  Required<Pick<TextareaProps, 'borderRadius' | 'appearance' | 'full'>>

const getTextareaStyle = (appearance: TextareaAppearance) => (_: {
  theme: DefaultTheme
}) => {
  switch (appearance) {
    case 'outline':
      return {
        resize: 'none' as 'none',
        '::-webkit-scrollbar': {
          /* border-width + expected scrollbar width */
          width: '20px'
        },

        '::-webkit-scrollbar-track': {
          boxShadow: `inset 0 0 10px 10px ${_.theme.colors.border.muted}`,
          border: 'solid 9px transparent'
        },

        '::-webkit-scrollbar-thumb': {
          boxShadow: `inset 0 0 10px 10px ${_.theme.colors.border.active}`,
          border: 'solid 9px transparent'
        }
      }
    default:
      return {}
  }
}

export const Textarea = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => getValueWithUnit(_.borderRadius)};
  padding: 8px 10px;
  box-sizing: border-box;
  min-height: 40px;
  resize: vertical;
  ${_ => ({
    width: _.width ? getValueWithUnit(_.width) : _.full ? '100%' : undefined
  })}

  ${_ => getTextInputStyle(_.appearance)};
  ${_ => getTextareaStyle(_.appearance)};
`
