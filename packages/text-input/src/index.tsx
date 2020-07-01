import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'
import {TextInputAffix} from './components/affix'

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      children,
      className,
      affixBefore,
      affixAfter,
      containerRef,
      onClickBefore,
      onClickAfter,
      value,
      readOnly,
      ...restProps
    } = props
    const defaults = useDefaults('textInput', restProps, {
      width: undefined,
      height: 32,
      full: false,
      appearance: 'default' as TextInputAppearanceType
    })

    return (
      <S.TextInputContainer
        width={defaults.width}
        full={defaults.full}
        ref={containerRef}
        className={className}
        data-expanded={restProps['aria-expanded']}
      >
        {affixBefore && (
          <TextInputAffix
            isBefore
            inputRef={ref}
            component={affixBefore}
            onClickBefore={onClickBefore}
            {...defaults}
          />
        )}
        <S.TextInput
          as="input"
          autoComplete={restProps.autoComplete}
          variant={getTextSizeForControlHeight(defaults.height)}
          borderRadius={getBorderRadiusForControlHeight(defaults.height)}
          color={restProps.disabled ? 'muted' : undefined}
          disabled={restProps.disabled}
          aria-invalid={restProps.invalid}
          ref={ref as any}
          affixBefore={affixBefore}
          affixAfter={affixAfter}
          readOnly={readOnly}
          value={value}
          {...defaults}
        />
        {affixAfter && (
          <TextInputAffix
            inputRef={ref}
            component={affixAfter}
            onClickAfter={onClickAfter}
            {...defaults}
          />
        )}
      </S.TextInputContainer>
    )
  }
)

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
