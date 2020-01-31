import styled from 'styled-components'
import {Scrollbars} from 'react-custom-scrollbars'
import {getTextInputStyle} from '@smashing/text-input'
import {TextareaProps} from './types'
import {Text} from '@smashing/typography'
import {getValueWithUnit} from '@smashing/theme'

type InputProps = TextareaProps &
  Required<Pick<TextareaProps, 'borderRadius' | 'appearance' | 'full'>>

export const ScrollbarContainer = styled(Scrollbars)``
export const TextareaContainer = styled.div<InputProps>`
  border: none;
  border-radius: ${_ => getValueWithUnit(_.borderRadius)};
  padding: ${_ => (_.scrollbarAppearance === 'outline' ? '8px 10px' : 0)};
  box-sizing: border-box;
  width: fit-content;
  margin-bottom: 0;
  display: block;
  ${_ => ({
    width: _.width ? getValueWithUnit(_.width) : _.full ? '100%' : undefined,
    color: _.theme.colors.border.active,
    '&[aria-invalid="true"]': {
      color: _.theme.colors.border.danger
    }
  })}
  ${_ => getTextInputStyle(_.appearance, _.disabled)};
  ${ScrollbarContainer} {
    box-sizing: border-box;
    width: fit-content;
    padding: ${_ => (_.scrollbarAppearance === 'outline' ? 0 : '8px 10px')};
  }
`

export const Textarea = styled(Text)`
  height: 100%;
  border: none;
  background-color: transparent;
  scrollbar-width: none;
  -ms-overflow-style: none;
  outline: none;
  padding: 0;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

export const VerticalScrollTrack = styled.div`
  background-color: ${_ => _.theme.colors.border.muted};
  top: -3px;
  bottom: -3px;
  right: 0px;
  border-radius: 10px;
`

export const VerticalScrollThumb = styled.div`
  background-color: currentColor;
  border-radius: inherit;
`
