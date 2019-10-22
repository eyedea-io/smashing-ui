import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

type StyledComponentElement =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<any>

const TextInputFCFactory: <AdditionalProps extends {}>(
  as: StyledComponentElement
) => React.FC<TextInputProps> = <AdditionalProps extends {}>(
  as: StyledComponentElement = 'input'
) =>
  React.forwardRef<any, TextInputProps>(({children, ...props}, ref: any) => {
    const defaults = useDefaults('textInput', props, {
      height: 32,
      full: false,
      appearance: 'default' as TextInputAppearanceType
    })

    return (
      <S.StyledTextContainer {...defaults}>
        <S.Input
          as="input"
          ref={ref}
          variant={getTextSizeForControlHeight(defaults.height)}
          borderRadius={getBorderRadiusForControlHeight(defaults.height)}
          color={props.disabled ? 'muted' : undefined}
          aria-invalid={props.invalid}
          {...defaults}
        />
      </S.StyledTextContainer>
    )
  })

const TextInput = styled<React.FC<TextInputProps>>(
  TextInputFCFactory('input')
)``
const TextInputAs = <T extends {}>(as: StyledComponentElement) =>
  styled(TextInputFCFactory<React.HTMLAttributes<T>>(as))``

export const TextInputComponents = S
export {TextInput, TextInputProps, TextInputAppearanceType, TextInputAs}
export {getTextInputStyle} from './styles'

declare module 'styled-components' {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput: Pick<TextInputProps, 'height' | 'appearance' | 'full'>
    }> {}
}
