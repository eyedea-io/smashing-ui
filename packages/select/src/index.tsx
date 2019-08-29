import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {SelectProps} from './types'
import {S} from './styles'
import styled from 'styled-components/macro'
import {ButtonAppearanceType, ButtonIntentType} from '@smashing/button'

const SelectFC: React.FC<SelectProps> = ({children, ...props}) => {
  const defaults = useDefaults<SelectProps>('select', props, {
    options: [],
    value: '',
    onChange: () => undefined,
    height: 32
  })

  const {onChange, ...propsSansChange} = props

  return (
    <S.SelectWrapper {...propsSansChange}>
      <S.SelectButtonComponent
        intent={props.intent}
        appearance={props.appearance}
        height={defaults.height}
        defaultValue={defaults.value}
        onChange={defaults.onChange}
        full={props.full}
        disabled={props.disabled}
      >
        {defaults.options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </S.SelectButtonComponent>
    </S.SelectWrapper>
  )
}

const Select = styled(SelectFC)``

export {Select}

declare module 'styled-components' {
  export interface SmashingSelectDefaults
    extends Partial<{
      select?: {
        height?: number
        appearance?: ButtonAppearanceType
        intent?: ButtonIntentType
      }
    }> {}
}
