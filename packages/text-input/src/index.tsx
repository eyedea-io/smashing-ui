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
  invalid,
  onClickBefore,
  onClickAfter
}) => (
  <React.Fragment>
    {affix === 'affixBefore' ? (
      <S.InputBefore
        invalid={invalid}
        disabled={disabled}
        height={height}
        onClick={props => onClickBefore && onClickBefore(inputRef, props)}
      >
        <IconComponent />
      </S.InputBefore>
    ) : (
      <S.InputAfter
        invalid={invalid}
        disabled={disabled}
        height={height}
        onClick={props => onClickAfter && onClickAfter(inputRef, props)}
        isString={typeof IconComponent === 'string'}
      >
        {typeof IconComponent === 'string' ? IconComponent : <IconComponent />}
      </S.InputAfter>
    )}
  </React.Fragment>
)

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
          onClickBefore={onClickBefore}
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
        <Affix
          inputRef={inputRef}
          component={affixAfter}
          onClickAfter={onClickAfter}
          {...defaults}
        />
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
