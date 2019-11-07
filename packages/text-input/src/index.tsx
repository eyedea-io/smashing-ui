import * as React from 'react'
import {TextInputAppearanceType, TextInputProps, AffixProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

const Affix: React.FC<AffixProps> = ({
  disabled,
  height,
  component: IconComponent,
  inputRef,
  invalid,
  affix
}) => {
  const [active, setActive] = React.useState(false)

  return (
    <React.Fragment>
      {affix === 'prefix' ? (
        <S.InputPrefix invalid={invalid} disabled={disabled} height={height}>
          <IconComponent
            inputRef={inputRef}
            toggleActive={() => setActive(!active)}
          />
        </S.InputPrefix>
      ) : (
        <S.InputSuffix invalid={invalid} disabled={disabled} height={height}>
          <IconComponent
            inputRef={inputRef}
            toggleActive={() => setActive(!active)}
          />
        </S.InputSuffix>
      )}
    </React.Fragment>
  )
}

const TextInput: React.FC<TextInputProps> = ({
  children,
  innerRef,
  prefix,
  suffix,
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
      {prefix && (
        <Affix
          affix="prefix"
          inputRef={inputRef}
          component={prefix}
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
        prefix={prefix}
        suffix={suffix}
        {...defaults}
      />
      {suffix && <Affix inputRef={inputRef} component={suffix} {...defaults} />}
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
