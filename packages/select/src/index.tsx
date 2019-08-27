import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import {SelectProps, Option} from './types'
import {S} from './styles'
import styled from 'styled-components/macro'

const SelectFC: React.FC<SelectProps> = ({children, ...props}) => {
  const defaults = useDefaults<SelectProps>('select', props, {
    options: [],
    selected: '',
    onChange: () => undefined,
    height: 32
  })

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    defaults.onChange(event.target.value)
  }

  return (
    <S.SelectWrapper {...props}>
      <S.SelectButtonComponent
        intent={props.intent}
        appearance={props.appearance}
        height={defaults.height}
        defaultValue={defaults.selected}
        onChange={onChange}
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
  export interface SmashingAlertDefaults
    extends Partial<{
      select?: {
        options: Option[]
        defaultValue: string
        onChange: (e) => void
      }
    }> {}
}
