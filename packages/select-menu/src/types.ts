import {PopoverProps} from '@smashing/popover'
import {ButtonAppearanceType} from '@smashing/button'

export type SelectMenuAppearanceType = ButtonAppearanceType
export type SelectMenuPopoverAppearanceType = 'card' | 'accordion'

export type SelectButtonProps = {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
}
export type SelectMenuChildrenFn<T extends OptionBase> = <T>(
  props: SelectButtonProps & {selectedItems: T | T[]}
) => React.ReactNode

export interface SelectMenuProps<T extends OptionBase> {
  options: T[]
  value: string | string[]
  children?: React.ReactNode | SelectMenuChildrenFn<T>
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
  onChange: (value: string | string[]) => void
  onSelect: (value: string) => void
  onDeselect: (value: string) => void
  /*
   * Configurable message shown when none, single or multiple options are selected.
   * Can be either a string (which will be shown when no option(s) are selected) or a function that
   * allows full message customization by passing an array of selected items.
   */
  placeholder?: string | ((selected: T[]) => React.ReactNode)
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
  placeholderForMultipleSelected?: (selected: T[]) => React.ReactNode

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
  // minWidth?: number

  /**
   * Are items selectable
   * (true: items are select with checkboxes,
   * false: menu close when item is selected)
   */
  isSelectable?: boolean

  disabled?: boolean
}

export interface OptionBase {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectMenuState {
  currentFilter: string
}
