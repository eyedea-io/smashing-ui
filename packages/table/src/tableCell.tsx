import * as React from 'react'
import styled from 'styled-components'
import {TableCellProps} from './types/tableCell'
import {useDefaults} from '@smashing/theme'
import {TableBox} from './tableBox'
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
  isSelectable,
  rightView,
  children,
  ...props
}) => {
  let mainRef = React.useRef(null)
  const defaults = useDefaults('button', props, {
    appearance: 'default',
    tabIndex: -1,
    onClick: () => {}
  })

  const handleKeyDown = e => {
    const {arrowKeysOverrides = {}} = props

    if (isSelectable) {
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

    safeInvoke(props.onkeydown, e)
  }
  const onRef = ref => {
    mainRef = ref
    safeInvoke(props.innerRef, ref)
  }
  return (
    <TableRowConsumer>
      {height => {
        return (
          <TableBox
            innerRef={onRef}
            height={height}
            tabIndex={isSelectable ? defaults.tabIndex : undefined}
            data-isselectable={isSelectable}
            onClick={defaults.onClick}
            onkeydown={handleKeyDown}
            {...props}
          >
            {children}
            {rightView ? rightView : null}
          </TableBox>
        )
      }}
    </TableRowConsumer>
  )
}

// TODO:defaults
