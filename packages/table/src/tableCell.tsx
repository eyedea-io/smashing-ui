import * as React from 'react'
import styled from 'styled-components'
import {TableCellProps} from './types/tableCell'
import {useDefaults} from '@smashing/theme'
import {TableRowConsumer} from './TableRowContext'
import {manageTableCellFocusInteraction} from './helpers/manageTableCellFocusInteraction'

export const safeInvoke = (fn, ...args) => {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}

const executeArrowKeyOverride = override => {
  if (!override) {
    return
  }

  if (typeof override === 'function') {
    override()
    return
  }

  if (typeof override === 'string') {
    ;(document.querySelector(override) as HTMLElement).focus()
  }

  // This needs to be the node, not a React ref.
  override.focus()
}
export const TableCell: React.FC<TableCellProps> = ({
  rightView,
  children,
  ...props
}) => {
  let mainRef = React.useRef(null)

  const defaults = useDefaults('tableCell', props, {
    appearance: 'default',
    tabIndex: -1,
    onClick: () => {},
    isSelectable: true
  })

  const handleKeyDown = e => {
    const {arrowKeysOverrides = {}} = props

    if (defaults.isSelectable) {
      const {key} = e
      if (
        key === 'ArrowUp' ||
        key === 'ArrowDown' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight'
      ) {
        e.preventDefault()
        try {
          // Support arrow key overrides.
          const override =
            arrowKeysOverrides[key.substr('Arrow'.length).toLowerCase()]
          if (override === false) return
          if (override) return executeArrowKeyOverride(override)

          manageTableCellFocusInteraction(key, mainRef)
        } catch (error) {
          console.error('Keyboard interaction not possible', error)
        }
      } else if (key === 'Escape') {
        ;(mainRef as any).current.blur()
      }
    }

    safeInvoke(props.onKeyDown, e)
  }
  const onRef = ref => {
    mainRef = ref
    safeInvoke(props.innerRef, ref)
  }

  const Box = styled.div<TableCellProps>`
    padding: 12px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: ${_ => props.height}; 
    overflow: hidden;
    /* ${_ => _.theme.elevation.dialog}; */
    :focus {
      outline: none;
      background-color: ${_ => _.theme.scales.blue.B2A};
      box-shadow: 'inset 0 0 0 1px  ${_ => _.theme.scales.blue.B2A}';
    }
    
  `
  return (
    <TableRowConsumer>
      {height => {
        return (
          <Box
            innerRef={onRef}
            height={height}
            tabIndex={defaults.isSelectable ? defaults.tabIndex : undefined}
            data-isselectable={defaults.isSelectable}
            onClick={defaults.onClick}
            onKeyDown={handleKeyDown}
            {...props}
          >
            {children}
            {rightView ? rightView : null}
          </Box>
        )
      }}
    </TableRowConsumer>
  )
}

declare module 'styled-components' {
  export interface SmashingTableCellDefaults
    extends Partial<{
      tableCell?: {
        appearance?: string
        tabIndex: number
        onClick: () => void
        isSelectable: boolean
      }
    }> {}
}
