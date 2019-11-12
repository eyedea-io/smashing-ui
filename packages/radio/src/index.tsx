import * as React from 'react'
import styled from 'styled-components'
import {useDefaults, getTextSizeForControlHeight} from '@smashing/theme'
import {RadioAppearanceType, RadioProps} from './types'
import * as S from './styles'

const RadioFC: React.FC<RadioProps> = props => {
  const {appearance, size, children, ...inputProps} = props
  const defaults = useDefaults('Radio', props, {
    size: 24,
    disabled: false,
    appearance: 'default' as RadioAppearanceType
  })

  return (
    <S.Label
      as="label"
      disabled={defaults.disabled}
      color={props.disabled ? 'muted' : 'default'}
      variant={getTextSizeForControlHeight(defaults.size)}
    >
      <S.OriginalRadio
        appearance={defaults.appearance}
        disabled={defaults.disabled}
        type="radio"
        {...inputProps}
      />
      <S.CustomRadio
        controlSize={defaults.size}
        appearance={defaults.appearance}
        checked={props.checked}
      />
      {children}
    </S.Label>
  )
}

const Radio = styled(RadioFC)``

export {Radio, RadioProps, RadioAppearanceType}

declare module 'styled-components' {
  export interface SmashingRadioDefaults
    extends Partial<{
      Radio: Pick<RadioProps, 'appearance' | 'size'>
    }> {}
}
