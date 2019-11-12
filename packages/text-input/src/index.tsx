import * as React from 'react'
import {
  TextInputAppearanceType,
  TextInputProps,
  TextInputAffixProps
} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults,
  useTheme
} from '@smashing/theme'

const TextInput: React.FC<TextInputProps> = ({
  children,
  innerRef,
  affixBefore,
  affixAfter,
  onClickBefore,
  onClickAfter,
  ...props
}) => {
  const defaults = useDefaults('textInput', props, {
    height: 32,
    full: false,
    appearance: 'default' as TextInputAppearanceType
  })
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <S.TextInputContainer
      ref={innerRef}
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      {...defaults}
    >
      {affixBefore && (
        <TextInputAffix
          isBefore
          inputRef={inputRef}
          component={affixBefore}
          onClickBefore={onClickBefore}
          {...defaults}
        />
      )}
      <S.TextInput
        as="input"
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? 'muted' : undefined}
        aria-invalid={props.invalid}
        ref={inputRef}
        affixBefore={affixBefore}
        affixAfter={affixAfter}
        {...defaults}
      />
      {affixAfter && (
        <TextInputAffix
          inputRef={inputRef}
          component={affixAfter}
          onClickAfter={onClickAfter}
          {...defaults}
        />
      )}
    </S.TextInputContainer>
  )
}

const TextInputAffix: React.FC<TextInputAffixProps> = ({
  isBefore,
  component: IconComponent,
  disabled,
  height,
  inputRef,
  invalid,
  onClickBefore,
  onClickAfter
}) => {
  const {colors} = useTheme()
  const color = invalid
    ? colors.text.danger
    : disabled
    ? colors.text.muted
    : colors.text.default

  const cssProps = {
    disabled,
    height,
    invalid,
    isBefore,
    variant: getTextSizeForControlHeight(
      typeof height === 'string' ? parseInt(height) : height
    )
  }

  const componentIsString = typeof IconComponent === 'string'

  return (
    <S.TextInputAffix
      {...cssProps}
      onClick={e =>
        isBefore
          ? onClickBefore && onClickBefore(inputRef, e)
          : onClickAfter && onClickAfter(inputRef, e)
      }
      isString={componentIsString}
    >
      {componentIsString ? IconComponent : <IconComponent color={color} />}
    </S.TextInputAffix>
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
