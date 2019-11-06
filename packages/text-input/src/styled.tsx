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
    suffix?: string
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

export const Affix = styled.span<
  {
    height: number | string
    suffix?: string
    invalid?: boolean
  } & InputProps
>`
  position: absolute;
  top: 0;
  box-sizing: border-box;
  padding: 0 calc(${_ => _.height}px / 2);

  height: ${_ =>
    typeof _.height === 'string' ? parseInt(_.height, 10) : _.height}px;
  ${_ => getTextInputAffixStyle(_)};
  svg {
    width: calc(${_ => _.height}px / 2);
  }
`
export const InputPrefix = styled(Affix)`
  left: 0;
`
export const InputSuffix = styled(Affix)`
  right: 0;
`

export const CalendarRegular = function(_a) {
  console.log(_a)
  var _b = _a.color,
    color = _b === void 0 ? 'black' : _b,
    _c = _a.size,
    size = _c === void 0 ? 32 : _c
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 16 16',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d:
        'M3 4C2.44772 4 2 4.44772 2 5V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4V2C14.6569 2 16 3.34315 16 5V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V5C0 3.34315 1.34315 2 3 2V4Z'
    }),
    React.createElement('path', {
      d:
        'M5 1C5 0.447715 5.44772 0 6 0C6.55228 0 7 0.447715 7 1V3C7 3.55228 6.55228 4 6 4C5.44772 4 5 3.55228 5 3V1Z'
    }),
    React.createElement('path', {
      d:
        'M9 1C9 0.447715 9.44772 0 10 0C10.5523 0 11 0.447715 11 1V3C11 3.55228 10.5523 4 10 4C9.44772 4 9 3.55228 9 3V1Z'
    }),
    React.createElement('path', {
      d:
        'M14 3C14 3.55228 13.5523 4 13 4C12.4477 4 12 3.55228 12 3C12 2.44772 12.4477 2 13 2C13.5523 2 14 2.44772 14 3Z'
    }),
    React.createElement('path', {
      d:
        'M4 3C4 3.55228 3.55228 4 3 4C2.44772 4 2 3.55228 2 3C2 2.44772 2.44772 2 3 2C3.55228 2 4 2.44772 4 3Z'
    }),
    React.createElement('path', {
      d:
        'M6 7C6 7.55228 5.55228 8 5 8C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6C5.55228 6 6 6.44772 6 7Z'
    }),
    React.createElement('path', {
      d:
        'M6 11C6 11.5523 5.55228 12 5 12C4.44772 12 4 11.5523 4 11C4 10.4477 4.44772 10 5 10C5.55228 10 6 10.4477 6 11Z'
    }),
    React.createElement('path', {
      d:
        'M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z'
    }),
    React.createElement('path', {
      d:
        'M9 7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7Z'
    }),
    React.createElement('path', {
      d:
        'M12 7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7C10 6.44772 10.4477 6 11 6C11.5523 6 12 6.44772 12 7Z'
    }),
    React.createElement('path', {
      d:
        'M12 11C12 11.5523 11.5523 12 11 12C10.4477 12 10 11.5523 10 11C10 10.4477 10.4477 10 11 10C11.5523 10 12 10.4477 12 11Z'
    })
  )
}
