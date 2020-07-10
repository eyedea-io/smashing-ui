import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {useDefaults} from '@smashing/theme'
import {S} from './styles'
import {CheckboxAppearanceType, CheckboxProps} from './types'

const CheckIcon = ({fill = 'currentColor'}) => (
  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path
      d="M1 3L3 5L7 1"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckboxFC = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (componentProps, ref) => {
    const {
      children,
      containerRef,
      onChange,
      className,
      value,
      id,
      checked,
      disabled,
      invalid,
      name,
      ...props
    } = componentProps
    const defaults = useDefaults('checkbox', props, {
      appearance: 'primary' as CheckboxAppearanceType
    })

    const isCommonCheckbox = [
      'primary',
      'minimal',
      'outline',
      'toggle'
    ].includes(defaults.appearance)

    return (
      <S.Label
        as="label"
        ref={containerRef}
        className={className}
        disabled={disabled}
        checked={checked}
        {...defaults}
        {...props}
      >
        <S.HiddenCheckbox
          value={value}
          checked={checked}
          onChange={onChange}
          appearance={defaults.appearance}
          ref={ref}
          id={id}
          name={name}
          invalid={invalid}
          disabled={disabled}
          {...props}
        />
        {isCommonCheckbox && (
          <S.CustomCheckbox
            appearance={defaults.appearance}
            checked={checked}
            aria-invalid={invalid}
            disabled={disabled}
            {...props}
          >
            <CheckIcon />
          </S.CustomCheckbox>
        )}
        {typeof children === 'string' ? (
          <Text
            variant={300}
            color={disabled ? 'muted' : checked ? 'intense' : 'default'}
            intent={invalid ? 'danger' : undefined}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </S.Label>
    )
  }
)

const Checkbox = styled(CheckboxFC)``

export {Checkbox, CheckboxProps, CheckboxAppearanceType}

export const CheckboxElements = {
  CustomCheckbox: S.CustomCheckbox,
  HiddenCheckbox: S.HiddenCheckbox,
  Label: S.Label
}

declare module 'styled-components' {
  export interface SmashingCheckboxDefaults
    extends Partial<{
      checkbox?: {
        appearance?: CheckboxAppearanceType
      }
    }> {}
}
