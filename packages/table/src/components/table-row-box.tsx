import styled from 'styled-components'
import {TableRowProps} from '../types/table-row'
import {getRowAppearance} from '../helpers/get-row-appearance'

export const TableRowBox = styled.div<TableRowProps>`
${_ => _.isSelectable && getRowAppearance(_.intent)};
cursor: ${_ => _.isSelectable && 'pointer'};
outline: none;
display: flex;
border-bottom: 1px solid ${_ => _.theme.colors.border.default};
height: '${_ => _.height}px';
`
