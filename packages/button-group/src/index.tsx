import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonAppearanceType,
  ButtonIntentType,
  ButtonProps
} from '@smashing/button'
import {ButtonGroupProps, ButtonGroupRadioProps} from './types'
import {useDefaults} from '@smashing/theme'
import {StyledButton, ButtonGroupWrapper} from './styles'

const ButtonGroupFC: React.FC<ButtonGroupProps & ButtonProps> = props => {
  const {options, onChange, value, appearance, layout, textAlign} = props

  return (
    <ButtonGroupWrapper childrenAmount={options.length} layout={layout}>
      {options.map(option => (
        <ButtonGroupRadio
          key={option.label}
          onChange={onChange}
          appearance={appearance}
          checked={value === option.value}
          textAlign={textAlign}
          {...option}
        />
      ))}
    </ButtonGroupWrapper>
  )
}

const ButtonGroupRadio: React.FC<ButtonGroupRadioProps &
  ButtonProps> = props => {
  const {onChange, value, label} = props
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: 'default' as ButtonAppearanceType,
    intent: 'none' as ButtonIntentType,
    isLoading: false,
    full: false
  })

  return (
    <StyledButton {...defaults} {...props} onClick={e => onChange(value, e)}>
      {label}
    </StyledButton>
  )
}

const ButtonGroup = styled(ButtonGroupFC)``

export {ButtonGroup}
