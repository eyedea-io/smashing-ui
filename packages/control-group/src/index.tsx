import * as React from 'react'
import styled from 'styled-components'
import {ButtonProps, ButtonAppearanceType} from '@smashing/button'
import {Radio, RadioAppearanceType} from '@smashing/radio'
import {Checkbox, CheckboxAppearanceType} from '@smashing/checkbox'
import {
  ControlProps,
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

  const handleOnChange = (itemValue: string) => {
    if (Array.isArray(groupValue)) {
      if (groupValue.includes(itemValue)) {
        safeInvoke(onChange, groupValue.filter(item => item !== itemValue))
      } else {
        safeInvoke(onChange, groupValue.concat(itemValue))
      }
    } else {
      const newValue = groupValue === itemValue ? undefined : itemValue
      safeInvoke(onChange, newValue)
    }
  }

  const renderControl = (item: ControlProps) => {
    const controlProps = {
      key: item.label,
      textAlign,
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
            appearance={controlAppearance as RadioAppearanceType}
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
            appearance={controlAppearance as CheckboxAppearanceType}
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
            appearance={controlAppearance as ButtonAppearanceType}
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
  export interface SmashingControlGroupDefaults
    extends Partial<{
      controlAppearance: ControlAppearanceType
      groupAppearance: ControlGroupAppearanceType
    }> {}
}

function safeInvoke(fn, ...args) {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}
