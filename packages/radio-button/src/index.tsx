import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {S} from './styles'
import {useDefaults} from '@smashing/theme'
import {RadioButtonAppearanceType, RadioButtonProps} from './types'

const RadioButtonFC: React.FC<RadioButtonProps> = ({children, ...props}) => {
  const defaults = useDefaults('radio-button', props, {
    appearance: 'default' as RadioButtonAppearanceType
  })

  return (
    <S.Label as="label" htmlFor={props.name} {...defaults} {...props}>
      <S.HiddenRadioButton
        checked={props.checked}
        onChange={props.onChange}
        appearance={defaults.appearance}
        {...props}
      />
      <S.CustomRadioButton
        appearance={defaults.appearance}
        checked={props.checked}
        {...props}
      ></S.CustomRadioButton>
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

const RadioButton = styled(RadioButtonFC)``

export {RadioButton, RadioButtonProps, RadioButtonAppearanceType}

declare module 'styled-components' {
  export interface SmashingRadioButtonDefaults
    extends Partial<{
      checkbox?: {
        appearance?: RadioButtonAppearanceType
      }
    }> {}
}
