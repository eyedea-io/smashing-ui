import * as React from 'react'
import {useDefaults} from '@smashing/theme'
import styled from 'styled-components'
import {ButtonIntentType, ButtonAppearanceType} from '@smashing/button'
import {TextInputAppearanceType} from '@smashing/text-input'
import {SelectProps} from './types'
import {S} from './styles'
import useOutsideClick from './useOutsideClick'

type appearancesWithCustomList = Exclude<
  TextInputAppearanceType | undefined,
  ButtonAppearanceType
>

const SelectFC: React.FC<SelectProps> = ({children, ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const defaults = useDefaults<SelectProps>('select', props, {
    options: [],
    value: '',
    height: 32
  })

  const node = React.useRef<HTMLDivElement>(null)
  useOutsideClick(node, () => {
    setIsOpen(false)
  })

  const {onChange, ...propsSansChange} = props

  const options = defaults.options || []
  const appearancesWithCustomOptionsList: (appearancesWithCustomList)[] = [
    'outline'
  ]

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
      props.appearance as appearancesWithCustomList
    )
  ) {
    return (
      <S.SelectWrapper
        ref={node}
        onClick={() => setIsOpen(!isOpen)}
        {...propsSansChange}
      >
        <S.SelectButtonComponent
          readonly
          placeholder={props.placeholder}
          isOpen={isOpen}
          appearance={props.appearance as any}
          {...propsSansChange}
        >
          {props.value}
        </S.SelectButtonComponent>
        <S.CustomOptionsList appearance={props.appearance} isOpen={isOpen}>
          {options.map(o => (
            <S.CustomOption
              onClick={e => onChange && onChange(o.value)}
              key={o.value}
            >
              {o.label}
            </S.CustomOption>
          ))}
        </S.CustomOptionsList>
      </S.SelectWrapper>
    )
  }

  return (
    <S.SelectWrapper {...propsSansChange}>
      <S.SelectButtonAsSelectComponent {...selectButtonProps}>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </S.SelectButtonAsSelectComponent>
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
