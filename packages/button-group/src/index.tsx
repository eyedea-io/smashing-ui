import * as React from 'react'
import styled from 'styled-components'
import {Button} from '@smashing/button'

export interface Options {
  label: string
  value: any
  onChange: any
  checked: boolean
}

export interface ButtonGroupProps {
  onChange: any
  options: Options[]
  value: any
}

const StyledButton = styled(Button)<{checked?: boolean}>`
  border-radius: 0;
  ${_ =>
    _.checked && {
      backgroundColor: _.theme.scales.blue.B3A,
      backgroundImage: 'none'
    }}
  &:first-child {
    border-radius: 3px 0 0 3px;
  }
  &:last-child {
    border-radius: 0 3px 3px 0;
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

const ButtonGroupRadio: React.FC<Options> = ({
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
