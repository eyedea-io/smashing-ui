import * as React from 'react'
import {constants} from '@smashing/theme'
import Downshift, {DownshiftProps} from 'downshift'

const {position: Position} = constants
export type Position =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

export interface AutocompleteProps extends DownshiftProps<any> {
  /**
   * This prop can be either a string or a Node.
   * It will provide a title for the items
   */
  title?: string | React.ReactNode
  /**
   * An array of items to be used as options for the select
   */
  items?: []
  /**
   * The selected Item to be shown on the autocomplete
   */
  selectedItem?: any
  /**
   * The selected item to be selected & shown by default on the autocomplete
   */
  defaultSelectedItem?: any
  /**
   * In case the array of items is not an array of strings,
   * this function is used on each item to return the string that will be shown on the filter
   */
  itemToSting?: () => string
  /**
   * Function that will render the 'filter' component.
   */
  children?: any
  /**
   * The height of each item in the list
   * Because the list is virtualized this is required beforehand.
   */
  itemSize?: number
  /**
   * Function that returns a component to render the item
   */
  renderItem?: () => void
  /**
   * The position of the Popover the Autocomplete is rendered in.
   */
  position?: Position
  /**
   * A function that is used to filter the items.
   * It should return a subset of the initial items.
   * By default the "fuzzaldrin-plus" package is used.
   */
  itemsFilter?: () => void

  /**
   * Prop that enables and disables filtering
   * True: Enables Filtering
   * False: Disables Filtering
   */
  isFilterDisabled?: boolean

  /**
   * Defines the minimum height the results container will be
   */
  popoverMinWidth?: number

  /**
   * Defines the maximum height the results container will be
   */
  popoverMaxHeight?: number
}

export interface AutocompleteItemProps {
  children?: React.ReactNode
  isSelected?: boolean
  isHighlited?: boolean
}
