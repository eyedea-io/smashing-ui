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
  padding: 0 calc(${_ => _.height}px / 2);
  height: ${_ =>
    typeof _.height === 'string' ? parseInt(_.height, 10) : _.height}px;
  line-height: ${_ =>
    typeof _.height === 'string' ? parseInt(_.height, 10) : _.height}px;
  ${_ => _.onClick && 'cursor: pointer;'}
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
  var _b = _a.color,
    color = _b === void 0 ? 'black' : _b,
    _c = _a.size,
    size = _c === void 0 ? 32 : _c
  return (
    <svg
      width={_c}
      height={_c}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.99877 6.45006C2.97275 5.92097 2.53554 5.5 2 5.5C1.44772 5.5 1 5.94772 1 6.5C1 6.84128 1.12034 7.1705 1.2319 7.41586C1.35536 7.6874 1.52508 7.9771 1.72585 8.26936C2.12825 8.85512 2.69543 9.50922 3.38622 10.1227C4.75029 11.3341 6.72782 12.5 9 12.5C11.2722 12.5 13.2497 11.3341 14.6138 10.1227C15.3046 9.50922 15.8718 8.85512 16.2742 8.26936C16.4749 7.9771 16.6446 7.6874 16.7681 7.41586C16.8797 7.1705 17 6.84128 17 6.5C17 5.94772 16.5523 5.5 16 5.5C15.4645 5.5 15.0272 5.92097 15.0012 6.45006C14.9968 6.4652 14.9831 6.50959 14.9475 6.58804C14.8844 6.72666 14.7791 6.91352 14.6257 7.13689C14.3196 7.58238 13.8617 8.11578 13.2857 8.6273C12.1163 9.66586 10.5938 10.5 9 10.5C7.40618 10.5 5.88371 9.66586 4.71429 8.6273C4.13832 8.11578 3.68038 7.58238 3.37434 7.13689C3.22089 6.91352 3.11556 6.72666 3.05253 6.58804C3.01686 6.50959 3.00325 6.46519 2.99877 6.45006Z"
        fill="#1D304E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.16982 10.364C7.70328 10.5069 8.01986 11.0553 7.87692 11.5887L7.40959 13.3328C7.26665 13.8663 6.71831 14.1829 6.18485 14.0399C5.65138 13.897 5.3348 13.3487 5.47774 12.8152L5.94507 11.0711C6.08801 10.5376 6.63635 10.221 7.16982 10.364Z"
        fill="#1D304E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.2072 8.48821C4.59772 8.87873 4.59772 9.51189 4.2072 9.90242L2.90251 11.2071C2.51199 11.5976 1.87882 11.5976 1.4883 11.2071C1.09777 10.8166 1.09777 10.1834 1.4883 9.79289L2.79299 8.48821C3.18351 8.09768 3.81668 8.09768 4.2072 8.48821Z"
        fill="#1D304E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6568 10.5341C10.1234 10.677 9.8068 11.2254 9.94974 11.7588L10.3715 13.3328C10.5144 13.8663 11.0628 14.1829 11.5962 14.0399C12.1297 13.897 12.4463 13.3487 12.3033 12.8152L11.8816 11.2412C11.7386 10.7077 11.1903 10.3911 10.6568 10.5341Z"
        fill="#1D304E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.2928 9.79287L15.207 8.70708C14.8165 8.31655 14.1833 8.31655 13.7928 8.70708C13.4023 9.0976 13.4023 9.73077 13.7928 10.1213L14.8786 11.2071C15.2691 11.5976 15.9023 11.5976 16.2928 11.2071C16.6833 10.8166 16.6833 10.1834 16.2928 9.79287Z"
        fill="#1D304E"
      />
    </svg>
  )
}
