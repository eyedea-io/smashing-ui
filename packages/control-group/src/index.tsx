import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonAppearanceType,
  ButtonIntentType,
  ButtonProps
} from '@smashing/button'
import {
  ControlGroupProps,
  ControlProps,
  ControlAppearanceType,
  ControlGroupAppearanceType
} from './types'
import {useDefaults} from '@smashing/theme'
import {StyledButton, ControlGroupWrapper} from './styles'

const ControlGroupFC: React.FC<ControlGroupProps & ButtonProps> = props => {
  const {controlAppearance, groupAppearance} = useDefaults(
    'controlGroup',
    props,
    {
      controlAppearance: 'default' as ControlAppearanceType,
      groupAppearance: 'button' as ControlGroupAppearanceType
    }
  )

  const {items, onValueChange, value, layout, textAlign} = props

  return (
    <ControlGroupWrapper
      appearance={groupAppearance}
      childrenAmount={items.length}
      layout={layout}
    >
      {items.map(option => (
        <ButtonControl
          key={option.label}
          onValueChange={onValueChange}
          appearance={controlAppearance}
          checked={value === option.value}
          textAlign={textAlign}
          {...option}
        />

        // <ControlGroupRadio
        //   key={option.label}
        //   onValueChange={onValueChange}
        //   appearance={appearance}
        //   checked={value === option.value}
        //   textAlign={textAlign}
        //   {...option}
        // />
      ))}
    </ControlGroupWrapper>
  )
}

const ButtonControl: React.FC<ControlProps & ButtonProps> = props => {
  const {onValueChange, value, label} = props
  const defaults = useDefaults('button', props, {
    height: 32,
    appearance: 'default' as ButtonAppearanceType,
    intent: 'none' as ButtonIntentType,
    isLoading: false,
    full: false
  })

  return (
    <StyledButton {...defaults} {...props} onClick={e => onValueChange(value)}>
      {label}
    </StyledButton>
  )
}

const ControlGroup = styled(ControlGroupFC)``

export {ControlGroup}
