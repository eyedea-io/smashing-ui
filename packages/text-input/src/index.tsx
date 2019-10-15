import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'
import {TextInputAppearanceType, TextInputProps, StyledTextProps} from './types'
import {getTextInputStyle} from './styles'

const StyledText = styled(Text)<StyledTextProps>`
  border: none;
  border-radius: ${_ => _.borderRadius}px;
  width: ${_ => (typeof _.width === 'number' ? `${_.width}px` : _.width)};
  height: ${_ => _.height}px;
  padding-left: ${_ => Math.round(_.height / 3.2)}px;
  padding-right: ${_ =>
    Math.round(_.height / 3.2) + (_.suffix ? _.suffix.length * 12 : 0)}px;
  box-sizing: border-box;
  ${_ => getTextInputStyle(_.appearance)}
`

const StyledTextContainer = styled.div<StyledTextProps>`
  position: relative;
  display: inline-block;
  ${_ =>
    _.suffix && {
      '&:after': {
        content: `'${_.suffix}'`,
        position: 'absolute',
        right: `${Math.round(_.height / 3.2)}px`,
        top: '50%',
        transform: 'translate(0,-50%)',
        color: _.theme.colors.text.muted
      }
    }}
`

const TextInput = React.forwardRef<any, TextInputProps>(
  ({children, ...props}, ref: any) => {
    const defaults = useDefaults('textInput', props, {
      height: 32,
      appearance: 'default' as TextInputAppearanceType
    })

    return (
      <StyledTextContainer {...defaults}>
        <StyledText
          as="input"
          ref={ref}
          variant={getTextSizeForControlHeight(defaults.height)}
          borderRadius={getBorderRadiusForControlHeight(defaults.height)}
          color={props.disabled ? 'muted' : undefined}
          {...defaults}
        />
      </StyledTextContainer>
    )
  }
)

export {TextInput, TextInputProps, TextInputAppearanceType}

declare module 'styled-components' {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput?: {
        height?: number
        appearance?: TextInputAppearanceType
      }
    }> {}
}
