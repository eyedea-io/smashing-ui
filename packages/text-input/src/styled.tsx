import styled from 'styled-components'
import {TextInputProps} from './types'
import {getTextInputStyle} from './styles'
import {Text} from '@smashing/typography'

type InputProps = TextInputProps &
  Required<Pick<TextInputProps, 'height' | 'appearance'>>

export const Input = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  ${_ => {
    const height =
      typeof _.height === 'string' ? parseInt(_.height, 10) : _.height

    return {
      width: typeof _.width === 'string' ? _.width : `${_.width}px`,
      height: `${height}px`,
      paddingLeft: `${Math.round(height / 3.2)}px`,
      paddingRight: `${Math.round(height / 3.2)}px`
    }
  }}
  ${_ => getTextInputStyle(_.appearance)}
`
