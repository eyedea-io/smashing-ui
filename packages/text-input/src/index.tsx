import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

const TextInput = React.forwardRef<any, TextInputProps>(
  ({children, ...props}, ref: any) => {
    const defaults = useDefaults('textInput', props, {
      height: 32,
      full: false,
      appearance: 'default' as TextInputAppearanceType
    })

    return (
      <S.Input
        as="input"
        ref={ref}
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? 'muted' : undefined}
        aria-invalid={props.invalid}
        {...defaults}
      />
    )
  }
)

export const TextInputComponents = S
export {TextInput, TextInputProps, TextInputAppearanceType}
export {getTextInputStyle} from './styles'

declare module 'styled-components' {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput: Pick<TextInputProps, 'height' | 'appearance' | 'full'>
    }> {}
}
