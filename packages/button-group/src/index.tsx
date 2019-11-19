import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonProps,
  ButtonAppearanceType,
  ButtonIntentType
} from '@smashing/button'
import {ExtendedButtonGroupProps, ButtonGroupOptionProps} from './types'
import {useDefaults} from '@smashing/theme'
import {StyledButton, ButtonGroupWrapper} from './styles'

const ButtonGroupFC: React.FC<ExtendedButtonGroupProps> = props => {
  const {options, onChange, value, layout} = props

  return (
    <ButtonGroupWrapper childrenAmount={options.length} layout={layout}>
      {options.map(option => (
        <ButtonGroupRadio
          {...props}
          key={option.label}
          onChange={onChange}
          checked={value === option.value}
          {...option}
        />
      ))}
    </ButtonGroupWrapper>
  )
}

const ButtonGroupRadio: React.FC<ButtonGroupOptionProps &
  ButtonProps> = props => {
  const {onChange, value, checked, label} = props
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: 'default' as ButtonAppearanceType,
    intent: 'none' as ButtonIntentType,
    isLoading: false,
    full: false
  })

  return (
    <StyledButton
      {...defaults}
      onClick={e => onChange(value, e)}
      checked={checked}
    >
      <input type="radio" hidden value={value} />
      {label}
    </StyledButton>
  )
}

const ButtonGroup = styled(ButtonGroupFC)``

export {ButtonGroup}

declare module 'styled-components' {
  export interface SmashingButtonDefaults
    extends Partial<{
      button?: {
        height?: number
        isLoading?: boolean
      }
    }> {}
}
