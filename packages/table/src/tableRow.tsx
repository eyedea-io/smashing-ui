import * as React from 'react'
import {TableRowProvider} from './TableRowContext'
import {TableBox} from './tableBox'
import {safeInvoke} from './tableCell'
import {manageTableRowFocusInteraction} from './helpers/manageTableRowFocusInteraction'
import {TableRowProps, TableRowIntentType} from './types/tableRow'
import {useDefaults} from '@smashing/theme'

export const TableRow: React.FC<TableRowProps> = ({children, ...props}) => {
  const defaults = useDefaults('tableRow', props, {
    appearance: 'default',
    intent: 'none' as TableRowIntentType,
    height: 48,
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

  return (
    <TableBox
      innerRef={onRef}
      aria-selected={props.isHighlighted}
      aria-current={props.isSelected}
      data-isselectable={defaults.isSelectable}
      tabIndex={defaults.isSelectable ? defaults.tabIndex : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      height={props.height}
      borderBottom="muted"
      {...props}
    >
      {children}
    </TableBox>
  )
}
