import styled from 'styled-components'
import {TextInputProps} from './types'
import {getTextInputStyle, getTextInputAffixStyle} from './styles'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'
import * as React from 'react'

type InputProps = TextInputProps &
  Required<Pick<TextInputProps, 'height' | 'appearance' | 'full'>>

export const StyledTextContainer = styled.div<
  {
    height: number | string
  } & InputProps
>`
  display: grid;
  border-radius: ${_ => _.borderRadius}px;
  position: relative;
`

export const Input = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  box-sizing: border-box;
  ${_ => _.invalid && `color: ${_.theme.colors.text.danger};`}
  ${_ => {
    const height =
      typeof _.height === 'string' ? parseInt(_.height, 10) : _.height

    let width = _.width
      ? getValueWithUnit(_.width)
      : _.full
      ? '100%'
      : undefined

    const calcPadding = affix =>
      affix ? `${height * 1.5}px` : `${Math.round(height / 3.2)}px`

    return {
      width,
      height: `${height}px`,
      paddingLeft: calcPadding(_.prefix),
      paddingRight: calcPadding(_.suffix)
    }
  }}
  ${_ => getTextInputStyle(_.appearance)};
`

export const Affix = styled.span<{
  height: number | string
  invalid?: boolean
  disabled?: boolean
  onClick?: any
}>`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: ${_ =>
    typeof _.height === 'string' ? parseInt(_.height, 10) : _.height}px;
  line-height: ${_ =>
    typeof _.height === 'string' ? parseInt(_.height, 10) : _.height}px;
  ${_ => _.onClick && 'cursor: pointer;'}
  ${_ => getTextInputAffixStyle(_)};

  svg {
    width: calc(${_ => _.height}px / 2);
    height: ${_ => _.height}px;
    padding: 0 calc(${_ => _.height}px / 2);
  }
`
export const InputPrefix = styled(Affix)`
  left: 0;
`
export const InputSuffix = styled(Affix)`
  right: 0;
`
