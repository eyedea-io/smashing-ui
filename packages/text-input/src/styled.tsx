import styled from 'styled-components'
import {TextInputProps} from './types'
import {getTextInputStyle} from './styles'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'

type InputProps = TextInputProps &
  Required<Pick<TextInputProps, 'height' | 'appearance' | 'full'>>

export const Input = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  box-sizing: border-box;

  ${_ => {
    const height =
      typeof _.height === 'string' ? parseInt(_.height, 10) : _.height

    let width = _.width
      ? getValueWithUnit(_.width)
      : _.full
      ? '100%'
      : undefined

    return {
      width,
      height: `${height}px`,
      paddingLeft: `${Math.round(height / 3.2)}px`,
      paddingRight: `${Math.round(height / 3.2)}px`
    }
  }}
  ${_ => getTextInputStyle(_.appearance)};
`

export const StyledTextContainer = styled.div<{
  height: number | string
  suffix?: string
}>`
  position: relative;
  display: inline-block;
  width: fit-content;
  height: fit-content;
  ${_ => {
    const height =
      typeof _.height === 'string' ? parseInt(_.height, 10) : _.height
    return (
      _.suffix && {
        '&:after': {
          content: `'${_.suffix}'`,
          position: 'absolute',
          right: `${Math.round(height / 3.2)}px`,
          top: '50%',
          transform: 'translate(0,-50%)',
          color: _.theme.colors.text.muted
        }
      }
    )
  }}
`
