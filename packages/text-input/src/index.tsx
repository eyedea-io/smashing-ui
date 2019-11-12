import * as React from 'react'
import {TextInputAppearanceType, TextInputProps, AffixProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

const Affix: React.FC<AffixProps> = ({
  affix,
  component: IconComponent,
  disabled,
  height,
  inputRef,
  invalid
}) => (
  <React.Fragment>
    {affix === 'affixBefore' ? (
      <S.InputBefore invalid={invalid} disabled={disabled} height={height}>
        <IconComponent inputRef={inputRef} />
      </S.InputBefore>
    ) : (
      <S.InputAfter
        invalid={invalid}
        disabled={disabled}
        height={height}
        isString={typeof IconComponent === 'string'}
      >
        {typeof IconComponent === 'string' ? (
          IconComponent
        ) : (
          <IconComponent inputRef={inputRef} />
        )}
      </S.InputAfter>
    )}
  </React.Fragment>
)

const TextInput: React.FC<TextInputProps> = ({
  children,
  innerRef,
  affixBefore,
  affixAfter,
  ...props
}) => {
  const defaults = useDefaults('textInput', props, {
    height: 32,
    full: false,
    appearance: 'default' as TextInputAppearanceType
  })
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <S.StyledTextContainer
      ref={innerRef}
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      {...defaults}
    >
      {affixBefore && (
        <Affix
          affix="affixBefore"
          inputRef={inputRef}
          component={affixBefore}
          {...defaults}
        />
      )}
      <S.Input
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
        <Affix inputRef={inputRef} component={affixAfter} {...defaults} />
      )}
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
