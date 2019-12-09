import {PopoverProps} from '@smashing/popover'
import {ButtonAppearanceType} from '@smashing/button'
import {MenuOptionValue, MenuOption} from '@smashing/menu'

export type SelectMenuAppearanceType = ButtonAppearanceType
export type SelectMenuPopoverAppearanceType = 'card' | 'accordion'

export type SelectButtonProps = {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
}
export type SelectMenuChildrenFn = (
  props: SelectButtonProps & {
    selectedItems: MenuOptionValue | MenuOptionValue[]
  }
) => React.ReactNode

export interface SelectMenuProps {
  options: MenuOption[]
  value: MenuOptionValue | MenuOptionValue[]
  children?: React.ReactNode | SelectMenuChildrenFn
  /**
   * Select button appearance
   */
  appearance?: ButtonAppearanceType
  /**
   * Display filter input in popover
   * @default false
   */
  hasFilter?: boolean
  /**
   * Display close button in popover
   * @default true
   */
  hasCloseButton?: boolean
  /**
   * Display title in popover
   * @default false
   */
  hasTitle?: boolean
  /**
   * Title content displayed in popover
   */
  title?: string
  /**
   * Select button height
   */
  height?: number
  onChange?: (value: MenuOptionValue | MenuOptionValue[]) => void
  onSelect?: (value: MenuOptionValue) => void
  onDeselect?: (value: MenuOptionValue) => void
  /*
   * Configurable message shown when none, single or multiple options are selected.
   * Can be either a string (which will be shown when no option(s) are selected) or a function that
   * allows full message customization by passing an array of selected items.
   */
  placeholder?: MenuOption | ((selected: MenuOption[]) => React.ReactNode)
  /**
   * Helper function for configuring message in multiple-selection scenarios, a syntactic sugar over `placeholder` prop.
   * Usage:
   *
   * ```ts
   *    <SelectMenu value={[]} placeholderForMultipleSelected={selected => `Tags: ${selected.length}`} />
   *    // is the same as
   *    <SelectMenu value={[]} placeholder={selected => selected.length === 0 ? 'Select...' : selected.length === 1 ? selected[0].label : `Tags: ${selected.length}`} />
   * ```
   */
  placeholderForMultipleSelected?: (selected: MenuOption[]) => React.ReactNode

  /**
   * Class name passed to select button
   */
  className?: string

  /**
   * If set to true, will filter out currently selected item from the list
   */
  hideSelectedItem?: boolean

  /**
   * Props that will be passed to the internal Popover component. Please note that
   * vital control props (isShown, children etc.) will have no effect when placed here.
   */
  popoverProps?: Partial<PopoverProps>

  /**
   * Popover appearance
   */
  popoverAppearance?: SelectMenuPopoverAppearanceType

  /**
   * Used to set component's visual style for indicating errors
   */
  invalid?: boolean

  /**
   * Select button width
   */
  width?: number
  // FIXME: Remove if unused
  // minWidth?: number

  /**
   * Are items selectable
   * (true: items are select with checkboxes,
   * false: menu close when item is selected)
   */
  isSelectable?: boolean

  disabled?: boolean

  /**
   * Sets arrow (chevron) icon to be displayed on the far right side of the select menu.
   * No icon is displayed if property is unset.
   */
  arrowIcon?: React.ReactNode
}
