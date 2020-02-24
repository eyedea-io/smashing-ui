import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'
import {TextInputAffix} from './components/affix'

const TextInput: React.FC<TextInputProps> = ({
  children,
  className,
  innerRef,
  affixBefore,
  affixAfter,
  onClickBefore,
  onClickAfter,
  value,
  readOnly,
  ...props
}) => {
  const defaults = useDefaults('textInput', props, {
    width: undefined,
    height: 32,
    full: false,
    appearance: 'default' as TextInputAppearanceType
  })
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <S.TextInputContainer
      width={defaults.width}
      full={defaults.full}
      ref={innerRef}
      className={className}
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
        autoComplete={props.autoComplete}
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? 'muted' : undefined}
        disabled={props.disabled}
        aria-invalid={props.invalid}
        ref={inputRef}
        affixBefore={affixBefore}
        affixAfter={affixAfter}
        readOnly={readOnly}
        value={value}
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

export const TextInputComponents = S
export {TextInput, TextInputProps, TextInputAppearanceType}
export {getTextInputStyle} from './styles'

export const TextInputElements = {
  Container: S.TextInputContainer,
  Input: S.TextInput
}

declare module 'styled-components' {
  export interface SmashingTextInputDefaults
    extends Partial<{
      textInput: Pick<TextInputProps, 'height' | 'appearance' | 'full'>
    }> {}
}
