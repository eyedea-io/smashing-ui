import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

const TextInput: React.FC<TextInputProps> = ({
  children,
  innerRef,
  iconAfter: IconAfter,
  ...props
}) => {
  const defaults = useDefaults('textInput', props, {
    height: 32,
    full: false,
    appearance: 'default' as TextInputAppearanceType
  })

  return (
    <S.StyledTextContainer
      ref={innerRef}
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      {...defaults}
    >
      <S.InputPrefix
        invalid={props.invalid}
        disabled={props.disabled}
        {...defaults}
      >
        {IconAfter ? <IconAfter /> : <S.CalendarRegular />}
      </S.InputPrefix>
      <S.Input
        as="input"
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? 'muted' : undefined}
        aria-invalid={props.invalid}
        {...defaults}
      />
      <S.InputSuffix
        {...defaults}
        invalid={props.invalid}
        disabled={props.disabled}
      >
        {IconAfter ? <IconAfter /> : <S.CalendarRegular />}
      </S.InputSuffix>
      ``
    </S.StyledTextContainer>
  )
}

export const TextInputComponents = S
export {TextInput, TextInputProps, TextInputAppearanceType}
export {getTextInputStyle} from './styles'

declare module 'styled-components' {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput: Pick<TextInputProps, 'height' | 'appearance' | 'full'>
    }> {}
}
