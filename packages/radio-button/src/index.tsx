import * as React from 'react'
import styled from 'styled-components'
import {Text} from '@smashing/typography'
import {getRadioButtonStyle, getLabelStyle} from './styles'
import {useDefaults} from '@smashing/theme'
import {
  RadioButtonAppearanceType,
  RadioButtonProps,
  StyledLabelProps
} from './types'

const Label = styled(Text)<StyledLabelProps>`
  display: flex;
  align-items: center;
  margin: 0;
  cursor: ${_ => (_.disabled ? 'not-allowed' : 'pointer')};
  ${_ => getLabelStyle(_.appearance, _.disabled, _.checked)};
`

const CustomRadioButton = styled.div.attrs({})<StyledLabelProps>`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
  border-radius: 4px;
  transition: all 150ms;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  border-radius: 100%;
  :after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${_ => (_.checked ? 'currentColor' : 'transparent')};
  }
`

const HiddenRadioButton = styled.input.attrs({
  type: 'radio'
})<{appearance: RadioButtonAppearanceType}>`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: relative;
  white-space: nowrap;
  opacity: 0;
  width: 1px;
  ${_ => getRadioButtonStyle(_.appearance, _.disabled, _.checked)};
`

const RadioButtonFC: React.FC<RadioButtonProps> = ({children, ...props}) => {
  const defaults = useDefaults('radio-button', props, {
    appearance: 'default' as RadioButtonAppearanceType
  })

  console.log(defaults.appearance)
  return (
    <Label as="label" {...defaults} {...props}>
      <HiddenRadioButton
        checked={props.checked}
        onChange={props.onChange}
        appearance={defaults.appearance}
        {...props}
      />
      <CustomRadioButton
        appearance={defaults.appearance}
        checked={props.checked}
        {...props}
      ></CustomRadioButton>
      {typeof children === 'string' ? (
        <Text variant={300} color={props.disabled ? 'muted' : 'default'}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Label>
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
