import * as React from 'react'
import {constants} from '@smashing/theme'

/**
 * Context used to manage the layering of z-indexes of components.
 */
export const StackingContext = React.createContext<number>(0)

export interface StackProps {
  /**
   * Function that takes the current z-index and returns a React Node.
   * (zIndex) => ReactNode.
   */
  children: (zIndes: number) => React.ReactNode

  /**
   * Set the value of the stack. This will increment for children.
   */
  value: number
}

/**
 * Component utility to help with stacking dialogs, tooltips, etc.
 */
export const Stack = ({children, value}: StackProps) => (
  <StackingContext.Consumer>
    {(previousValue: number) => {
      const currentValue = Math.max(
        value,
        previousValue || constants.stackingOrder.STACKING_CONTEXT
      )
      const nextValue = currentValue + 1

      return (
        <StackingContext.Provider value={nextValue}>
          {children(currentValue)}
        </StackingContext.Provider>
      )
    }}
  </StackingContext.Consumer>
)
