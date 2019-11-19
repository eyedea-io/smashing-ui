import * as React from 'react'
import styled from 'styled-components'
import {Button} from '@smashing/button'
import {ButtonGroupProps, Option} from './types'

const StyledButton = styled(Button)<{checked?: boolean}>`
  border-radius: 0;
  ${_ =>
    _.checked && {
      backgroundColor: _.theme.scales.blue.B3A,
      backgroundImage: 'none'
    }}
  &:first-child {
    border-radius: ${_ => `${_.theme.radius} 0 0 ${_.theme.radius}`};
  }
  &:last-child {
    border-radius: ${_ => `0 ${_.theme.radius} ${_.theme.radius} 0`};
  }
  &:focus {
    z-index: 1;
    position: relative;
  }
`

const ButtonGroupFC: React.FC<ButtonGroupProps> = ({
  options,
  onChange,
  value
}) => (
  <div>
    {options.map((o, i) => {
      return (
        <ButtonGroupRadio
          key={i}
          onChange={onChange}
          label={o.label}
          value={o.value}
          checked={value === o.value}
        />
      )
    })}
  </div>
)

const ButtonGroupRadio: React.FC<Option> = ({
  onChange,
  label,
  value,
  checked
}) => {
  return (
    <StyledButton onClick={e => onChange(value)} checked={checked}>
      <input type="radio" hidden checked={checked} value={value} />
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
