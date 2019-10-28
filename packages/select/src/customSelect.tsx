import * as React from 'react'
import {SelectProps} from './types'
import {S} from './styles'
import useOutsideClick from './useOutsideClick'

const CustomSelect: React.FC<SelectProps> = ({children, ...props}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const node = React.useRef<HTMLDivElement>(null)
  const selectedOptionRef = React.useRef<HTMLLIElement>(null)
  const menuListRef = React.useRef<HTMLUListElement>(null)
  useOutsideClick(node, () => {
    setIsOpen(false)
  })

  const {onChange, value, ...propsSansChange} = props
  const options = props.options || []

  React.useEffect(() => {
    if (menuListRef.current) {
      if (!selectedOptionRef || !selectedOptionRef.current) {
        menuListRef.current.scrollTo(0, 0)
      }
      if (selectedOptionRef && selectedOptionRef.current) {
        menuListRef.current.scrollTo(0, selectedOptionRef.current.offsetTop)
      }
    }
  }, [value, isOpen])

  return (
    <S.SelectWrapper
      ref={node}
      onClick={() => !props.disabled && setIsOpen(!isOpen)}
      {...propsSansChange}
    >
      <S.InputAsSelectButtonComponent
        readOnly
        defaultValue={value}
        placeholder={props.placeholder}
        isOpen={isOpen}
        appearance={props.appearance as any}
        {...propsSansChange}
      >
        {props.value}
      </S.InputAsSelectButtonComponent>
      <S.CustomOptionsList ref={menuListRef} isOpen={isOpen}>
        {options.map(o => (
          <S.CustomOption
            ref={o.value === value ? selectedOptionRef : null}
            checked={o.value === value}
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

export default CustomSelect
