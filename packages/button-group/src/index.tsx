import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonProps,
  ButtonAppearanceType,
  ButtonIntentType
} from '@smashing/button'
import {ButtonGroupProps, Option} from './types'
import {useDefaults} from '@smashing/theme'
import {StyledButton, ButtonGroupWrapper} from './styles'

const ButtonGroupFC: React.FC<ButtonGroupProps & ButtonProps> = props => {
  const {options, onChange, value, full} = props

  return (
    <ButtonGroupWrapper childrenAmount={options.length} full={full}>
      {options.map((o, i) => (
        <ButtonGroupRadio
          {...props}
          key={`${o.label}-${i}`}
          onChange={onChange}
          label={o.label}
          value={o.value}
          checked={value === o.value}
        />
      ))}
    </ButtonGroupWrapper>
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
