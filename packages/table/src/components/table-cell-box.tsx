import styled from 'styled-components'
import {TableCellProps} from '../types/table-cell'

export const TableCellBox = styled.div<TableCellProps>`
  padding: 12px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: ${_ => _.height};
  overflow: hidden;
  /* ${_ => _.theme.elevation.dialog}; */
  :focus {
    outline: none;
    background-color: ${_ => _.theme.scales.blue.B2A};
    box-shadow: 'inset 0 0 0 1px  ${_ => _.theme.scales.blue.B2A}';
  }
`
