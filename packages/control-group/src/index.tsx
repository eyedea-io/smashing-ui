import * as React from 'react'
import styled from 'styled-components'
import {ButtonProps} from '@smashing/button'
import {Radio} from '@smashing/radio'
import {Checkbox} from '@smashing/checkbox'
import {
  ControlGroupProps,
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

  const {items, onChange, value: groupValue, layout, textAlign} = props

  const handleOnChange = option => {
    if (Array.isArray(groupValue)) {
      if (groupValue.includes(option)) {
        safeInvoke(onChange, groupValue.filter(item => item !== option))
      } else {
        safeInvoke(onChange, groupValue.concat(option))
      }
    } else {
      const newValue = groupValue === option ? undefined : option
      safeInvoke(onChange, newValue)
    }
  }

  const renderControl = item => {
    const controlProps = {
      key: item.label,
      textAlign,
      appearance: controlAppearance as any,
      checked: Array.isArray(groupValue)
        ? groupValue.includes(item.value || '')
        : groupValue === item.value,

      ...item
    }

    switch (groupAppearance) {
      case 'radio-horizontal':
      case 'radio-vertical':
        return (
          <Radio
            {...controlProps}
            onChange={() => safeInvoke(handleOnChange, item.value)}
          >
            {item.label}
          </Radio>
        )
      case 'checkbox-horizontal':
      case 'checkbox-vertical':
        return (
          <Checkbox
            {...controlProps}
            onChange={() => safeInvoke(handleOnChange, item.value)}
          >
            {item.label}
          </Checkbox>
        )
      case 'button':
      default:
        return (
          <StyledButton
            {...controlProps}
            onClick={() => safeInvoke(handleOnChange, item.value)}
          >
            {item.label}
          </StyledButton>
        )
    }
  }

  return (
    <ControlGroupWrapper
      appearance={groupAppearance}
      childrenAmount={items.length}
      layout={layout}
    >
      {items.map(renderControl)}
    </ControlGroupWrapper>
  )
}
const ControlGroup = styled(ControlGroupFC)``

export {ControlGroup}

declare module 'styled-components' {
  export interface SmashingRadioDefaults
    extends Partial<{
      controlGroup: ControlGroupProps
    }> {}
}

function safeInvoke(fn, ...args) {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}
