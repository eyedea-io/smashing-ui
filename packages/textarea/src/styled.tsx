import styled from 'styled-components'
import {getTextInputStyle} from '@smashing/text-input'
import {TextareaProps} from './types'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'

type InputProps = TextareaProps &
  Required<Pick<TextareaProps, 'borderRadius' | 'appearance' | 'full'>>

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
`
