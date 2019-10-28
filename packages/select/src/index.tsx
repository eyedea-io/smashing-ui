import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import styled from 'styled-components'
import {ButtonIntentType, ButtonAppearanceType} from '@smashing/button'
import {SelectProps} from './types'
import {S} from './styles'
import CustomSelect from './customSelect'

const SelectFC: React.FC<SelectProps> = ({children, ...props}) => {
  const defaults = useDefaults<SelectProps>('select', props, {
    options: [],
    value: '',
    onChange: () => undefined,
    height: 32
  })

  const {onChange, ...propsSansChange} = props

  const options = defaults.options || []
  const appearancesWithCustomOptionsList: ButtonAppearanceType[] = ['outline']

  const selectButtonProps = {
    intent: props.intent,
    appearance: props.appearance,
    height: defaults.height,
    defaultValue: defaults.value,
    onChange: defaults.onChange,
    full: props.full,
    disabled: props.disabled
  }

  if (
    appearancesWithCustomOptionsList.includes(
      props.appearance as ButtonAppearanceType
    )
  ) {
    return <CustomSelect {...selectButtonProps} {...propsSansChange} />
  }

  return (
    <S.SelectWrapper {...propsSansChange}>
      <S.ButtonAsSelectComponent {...selectButtonProps}>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </S.ButtonAsSelectComponent>
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
