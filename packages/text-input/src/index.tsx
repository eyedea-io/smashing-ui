import * as React from 'react'
import {TextInputAppearanceType, TextInputProps, AffixProps} from './types'
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

const Affix: React.FC<AffixProps> = ({
  affix,
  component: IconComponent,
  disabled,
  height,
  inputRef,
  invalid,
  onClickBefore,
  onClickAfter
}) => {
  const {colors} = useTheme()
  const cssProps = {
    disabled,
    height,
    invalid
  }
  const getColor = () =>
    invalid
      ? colors.text.danger
      : disabled
      ? colors.text.muted
      : colors.text.default

  return (
    <React.Fragment>
      {affix === 'affixBefore' ? (
        <S.InputBefore
          {...cssProps}
          onClick={props => onClickBefore && onClickBefore(inputRef, props)}
          isString={typeof IconComponent === 'string'}
        >
          {typeof IconComponent === 'string' ? (
            IconComponent
          ) : (
            <IconComponent color={getColor()} />
          )}
        </S.InputBefore>
      ) : (
        <S.InputAfter
          {...cssProps}
          onClick={props => onClickAfter && onClickAfter(inputRef, props)}
          isString={typeof IconComponent === 'string'}
        >
          {typeof IconComponent === 'string' ? (
            IconComponent
          ) : (
            <IconComponent color={getColor()} />
          )}
        </S.InputAfter>
      )}
    </React.Fragment>
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
