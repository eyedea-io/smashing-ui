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
}) => {
  console.log(typeof IconComponent)
  return (
    <React.Fragment>
      {affix === 'before' ? (
        <S.InputBefore invalid={invalid} disabled={disabled} height={height}>
          <IconComponent inputRef={inputRef} />
        </S.InputBefore>
      ) : (
        <S.InputAfter
          invalid={invalid}
          disabled={disabled}
          height={height}
          string={typeof IconComponent === 'string'}
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
}

const TextInput: React.FC<TextInputProps> = ({
  children,
  innerRef,
  before,
  after,
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
      {before && (
        <Affix
          affix="before"
          inputRef={inputRef}
          component={before}
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
        before={before}
        after={after}
        {...defaults}
      />
      {after && <Affix inputRef={inputRef} component={after} {...defaults} />}
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
