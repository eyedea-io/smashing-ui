import * as React from 'react'
import {TextInputAppearanceType, TextInputProps} from './types'
import * as S from './styled'
import {
  getTextSizeForControlHeight,
  getBorderRadiusForControlHeight,
  useDefaults
} from '@smashing/theme'

interface AffixProps {
  prefix?: {
    icon?: any
    text?: string
  }
  suffix?: string | any
}

const Prefix = ({
  height,
  invalid,
  disabled,
  icon: Icon,
  children
}: {
  icon?: any
  height: number | string
  invalid?: boolean
  disabled?: boolean
  children?: string
}) => {
  if (children) {
    return (
      <S.InputPrefix invalid={invalid} disabled={disabled} height={height}>
        {children}
      </S.InputPrefix>
    )
  }

  return (
    <S.InputPrefix invalid={invalid} disabled={disabled} height={height}>
      {Icon ? <Icon /> : <S.CalendarRegular />}
    </S.InputPrefix>
  )
}
const Suffix = ({
  height,
  invalid,
  disabled,
  icon: Icon,
  children
}: {
  icon?: any
  height: number | string
  invalid?: boolean
  disabled?: boolean
  children?: string
}) => {
  if (children) {
    return (
      <S.InputSuffix invalid={invalid} disabled={disabled} height={height}>
        {children}
      </S.InputSuffix>
    )
  }

  return (
    <S.InputSuffix invalid={invalid} disabled={disabled} height={height}>
      {Icon ? <Icon /> : <S.CalendarRegular />}
    </S.InputSuffix>
  )
}

const TextInput: React.FC<TextInputProps & AffixProps> = ({
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

  return (
    <S.StyledTextContainer
      ref={innerRef}
      borderRadius={getBorderRadiusForControlHeight(defaults.height)}
      {...defaults}
    >
      {prefix && (
        <Prefix
          icon={prefix.icon}
          invalid={props.invalid}
          disabled={props.disabled}
          height={defaults.height}
        >
          {prefix.text}
        </Prefix>
      )}
      <S.Input
        as="input"
        variant={getTextSizeForControlHeight(defaults.height)}
        borderRadius={getBorderRadiusForControlHeight(defaults.height)}
        color={props.disabled ? 'muted' : undefined}
        aria-invalid={props.invalid}
        prefix={prefix ? true : false}
        suffix={suffix ? true : false}
        {...defaults}
      />
      {suffix && (
        <Suffix
          icon={suffix.icon}
          invalid={props.invalid}
          disabled={props.disabled}
          height={defaults.height}
        >
          {suffix.text}
        </Suffix>
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
