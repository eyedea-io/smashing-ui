import * as React from 'react'
import {SearchHeaderProps} from './types/search-header'
import {TextInput} from '@smashing/text-input'
import {TableHeaderCell} from './table-header-cell'
import styled from 'styled-components'

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  children,
  placeholder = '',
  value,
  icon,
  onChange = () => {},
  autoFocus,
  ...props
}) => {
  const Input = styled(TextInput)`
    border: none;
    background-color: transparent;
    width: 100%;
    &:focus {
      outline: none;
    }
  `
  const Icon = styled.img`
    width: 12px;
    height: auto;
  `
  return (
    <TableHeaderCell {...props}>
      <Icon src={icon} />
      <Input
        appearance="underline"
        placeholder={placeholder}
        onChange={onChange}
      />
    </TableHeaderCell>
  )
}
