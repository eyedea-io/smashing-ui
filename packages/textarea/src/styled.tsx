import styled from 'styled-components'
import {getTextInputStyle} from '@smashing/text-input'
import {TextareaProps} from './types'
import {Text} from '@smashing/typography'

type InputProps = TextareaProps &
  Required<Pick<TextareaProps, 'borderRadius' | 'appearance'>>

const getValueWithUnit = (value: string | number) =>
  typeof value === 'number' ? `${value}px` : value

export const Textarea = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => getValueWithUnit(_.borderRadius)};
  padding: 8px 10px;
  min-height: 40px;
  resize: vertical;
  ${_ => getTextInputStyle(_.appearance)};
`
