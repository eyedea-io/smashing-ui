import * as React from 'react'
import {TableRowProvider} from './table-row-context'
import {safeInvoke} from './table-cell'
import {manageTableRowFocusInteraction} from './helpers/manage-table-row-focus-interaction'
import {getRowAppearance} from './helpers/get-row-appearance'
import {TableRowProps, TableRowIntentType} from './types/table-row'
import {useDefaults} from '@smashing/theme'
import styled from 'styled-components'

export const TableRow: React.FC<TableRowProps> = ({children, ...props}) => {
  const defaults = useDefaults('tableRow', props, {
    intent: 'none' as TableRowIntentType,
    height: 32,
    onSelect: () => {},
    onDeselect: () => {},
    onKeyPress: e => {},
    isSelectable: true,
    tabIndex: -1
  })

  let mainRef = React.useRef(null)

  const handleClick = e => {
    if (typeof props.onClick === 'function') {
      props.onClick(e)
    }

    if (defaults.isSelectable) {
      if (props.isSelected) {
        defaults.onDeselect()
      } else {
        defaults.onSelect()
      }
    }
  }
  const handleKeyDown = e => {
    if (defaults.isSelectable) {
      const {key} = e
      if (key === 'Enter' || key === ' ') {
        defaults.onSelect()
        e.preventDefault()
      } else if (key === 'ArrowUp' || key === 'ArrowDown') {
        try {
          manageTableRowFocusInteraction(key, mainRef)
        } catch (error) {}
      } else if (key === 'Escape') {
        if (mainRef) (mainRef.current as any).blur()
      }
    }

    defaults.onKeyPress(e)
  }
  const onRef = ref => {
    mainRef = ref
    safeInvoke(props.innerRef, ref)
  }

  const Box = styled.div.attrs({'data-isselectable': defaults.isSelectable})<
    TableRowProps
  >`
    ${_ => defaults.isSelectable && getRowAppearance(defaults.intent)};
    cursor: ${defaults.isSelectable && 'pointer'};
    outline: none;
    display: flex;
    border-bottom: 1px solid ${_ => _.theme.colors.border.default};
    height: '${defaults.height}px';
  `

  return (
    <TableRowProvider value={defaults.height}>
      <Box
        innerRef={onRef}
        aria-selected={props.isHighlighted}
        aria-current={props.isSelected}
        data-isselectable={defaults.isSelectable}
        tabIndex={defaults.isSelectable ? defaults.tabIndex : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Box>
    </TableRowProvider>
  )
}

declare module 'styled-components' {
  export interface SmashingTableRowDefaults
    extends Partial<{
      tableRow?: {
        height?: number
        intent?: TableRowIntentType
        onSelect?: () => void
        onDeselect?: () => void
        onKeyPress?: () => void
        isSelectable: boolean
        tabIndex: number
      }
    }> {}
}
