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

const CheckboxFC: React.FC<CheckboxProps> = ({
  children,
  innerRef,
  ...props
}) => {
  const defaults = useDefaults('checkbox', props, {
    appearance: 'primary' as CheckboxAppearanceType
  })

  const isCommonCheckbox = [
    'primary',
    'minimal',
    'outline',
    'switcher'
  ].includes(defaults.appearance)

  return (
    <S.Label as="label" ref={innerRef} {...defaults} {...props}>
      <S.HiddenCheckbox
        checked={props.checked}
        onChange={props.onChange}
        appearance={defaults.appearance}
        {...props}
      />
      {isCommonCheckbox && (
        <S.CustomCheckbox
          appearance={defaults.appearance}
          checked={props.checked}
          {...props}
        >
          <CheckIcon />
        </S.CustomCheckbox>
      )}
      {typeof children === 'string' ? (
        <Text
          variant={300}
          color={
            props.disabled ? 'muted' : props.checked ? 'intense' : 'default'
          }
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </S.Label>
  )
}

const Checkbox = styled(CheckboxFC)``

export {Checkbox, CheckboxProps, CheckboxAppearanceType}

declare module 'styled-components' {
  export interface SmashingCheckboxDefaults
    extends Partial<{
      checkbox?: {
        appearance?: CheckboxAppearanceType
      }
    }> {}
}
