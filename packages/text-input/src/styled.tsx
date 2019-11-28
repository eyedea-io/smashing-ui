import styled from 'styled-components'
import {TextInputProps} from './types'
import {getTextInputStyle} from './styles'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'

type InputProps = TextInputProps &
  Required<Pick<TextInputProps, 'height' | 'appearance' | 'full'>>

type TextInputContainerProps = {
  full?: boolean
  width?: number | string
}

export const TextInputContainer = styled.div<TextInputContainerProps>`
  position: relative;
  ${_ => ({
    width: _.width ? getValueWithUnit(_.width) : _.full ? '100%' : 'fit-content'
  })}
`

export const TextInput = styled(Text)<InputProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  box-sizing: border-box;
  ${_ => _.invalid && `color: ${_.theme.colors.text.danger};`}
  ${_ => {
    const width = _.width
      ? getValueWithUnit(_.width)
      : _.full
      ? '100%'
      : undefined

    const height =
      typeof _.height === 'string' ? parseInt(_.height, 10) : _.height

    const padding = parseInt(_.theme.spacing.sm.slice(0, -2)) | 16
    const calcPadding = affix =>
      affix ? `${padding * 2 + height / 2}px ` : `${Math.round(height / 3.2)}px`

    return {
      width,
      height: `${height}px`,
      paddingLeft: calcPadding(_.affixBefore),
      paddingRight: calcPadding(_.affixAfter)
    }
  }}
  ${_ => getTextInputStyle(_.appearance)};
`

export const TextInputAffix = styled(Text)<{
  height: number
  isBefore?: boolean
  isClickable?: boolean
  isString?: boolean
  invalid?: boolean
}>`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  height: ${_ => _.height}px;
  line-height: ${_ => _.height}px;
  color: ${_ =>
    _.invalid ? _.theme.colors.text.danger : _.theme.colors.text.muted};
  ${_ => (_.isBefore ? 'left: 0;' : 'right: 0;')}
  ${_ => _.isString && `padding: 0 ${_.theme.spacing.sm};`}

  svg {
    width: calc(${_ => _.height}px / 2);
    height: ${_ => _.height}px;
    padding: 0 ${_ => _.theme.spacing.sm};
    ${_ => _.isClickable && 'cursor: pointer;'}
  }
`
