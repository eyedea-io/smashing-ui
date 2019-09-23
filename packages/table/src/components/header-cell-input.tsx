import styled from 'styled-components'
import {TextInput} from '@smashing/text-input'

export const HeaderCellInput = styled(TextInput)`
  border: none;
  background-color: transparent;
  width: 100%;
  height: inherit;
  box-shadow: none;
  &:focus {
    outline: none;
  }
`
