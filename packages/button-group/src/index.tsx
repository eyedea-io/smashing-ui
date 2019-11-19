import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonProps,
  ButtonAppearanceType,
  ButtonIntentType
} from '@smashing/button'
import {ButtonGroupProps, Option} from './types'
import {useDefaults} from '@smashing/theme'
import {StyledButton} from './styles'

const ButtonGroupFC: React.FC<ButtonGroupProps & ButtonProps> = props => {
  const {options, onChange, value} = props

  return (
    <div>
      {options.map((o, i) => (
        <ButtonGroupRadio
          {...props}
          key={i}
          onChange={onChange}
          label={o.label}
          value={o.value}
          checked={value === o.value}
        />
      ))}
    </div>
  )
}

const ButtonGroupRadio: React.FC<Option & ButtonProps> = props => {
  const {onChange, label, value, checked} = props
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: 'default' as ButtonAppearanceType,
    intent: 'none' as ButtonIntentType,
    isLoading: false,
    full: false
  })

  return (
    <StyledButton
      onClick={e => onChange(value, e)}
      checked={checked}
      appearance="outline"
      {...defaults}
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
