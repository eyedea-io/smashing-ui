import * as React from 'react'
import {AutocompleteItemProps} from './types'
import styled from 'styled-components'
import {Text} from '@smashing/typography'

const icon = (
  <svg viewBox="0 0 16 16" style={{fill: 'rgb(71, 184, 129)'}}>
    <path
      d="M14 3c-.28 0-.53.11-.71.29L6 10.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l8-8A1.003 1.003 0 0 0 14 3z"
      fillRule="evenodd"
    />
  </svg>
)

const S = {
  Icon: styled.div<AutocompleteItemProps>`
    margin-top: 3px;
    margin-left: 2px;
    margin-right: 10px;
    flex-grow: 0;
    svg {
      display: inline-block;
      height: 14px;
    }
    opacity: ${_ => _.isSelected ? 1 : 0};
  `,
  Box: styled.div<AutocompleteItemProps>`
    display: flex;
    align-items: center;
    border-bottom: 'false';
    height: ${_ => _.height};
  `,
  Label: styled(Text)`
    flex: 1;
    align-self: 'stretch';
  `
}

export const AutocompleteItem: React.FC<AutocompleteItemProps> = ({
isHighlighted,
  isSelected,
  children,
  isSelectable,
  onDeselect= () => {},
  onSelect= () => {},
  disabled,
  height,
  ...props
}) => {

 const handleClick = e => {
    if (typeof props.onClick === 'function') {
      props.onClick(e)
    }
console.log(isSelected,isSelectable)
    if (isSelectable) {
      if (isSelected) {
        onDeselect()
      } else {
        onSelect()
      }
    }
  }


  return (
    <S.Box
      height={height}
      isSelectable={isSelectable && !disabled}
      isHighlighted={isHighlighted}
      onSelect={onSelect}
      onDeselect={onDeselect}
      isSelected={isSelected}
      onClick ={handleClick}
    >
      <S.Icon>{icon}</S.Icon>
      <S.Label variant={300}> {children}</S.Label>
    </S.Box>
  )
}
