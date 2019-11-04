import {PopoverProps} from '@smashing/popover'

export type SelectMenuAppearanceType =
  | 'primary'
  | 'minimal'
  | 'card'
  | 'outline'
  | 'toggle'

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
  appearance?: SelectMenuAppearanceType
  hasFilter?: boolean
  hasTitle?: boolean
  title?: string
  minWidth?: number
  height?: number
  hasCloseButton?: boolean
  onSelect: (value: string) => void
  onDeselect: (value: string) => void
  multiOptionSelectedItemsLabel?: (itemsSelectedLength: number) => string
  isMultiSelect?: boolean
  compareBy?: string
  placeholder?: string
  renderItem?: (
    option: T,
    click: () => void,
    selected: boolean,
    options: T[]
  ) => React.ReactNode

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
   * Used to set component's visual style for indicating errors
   */
  invalid?: boolean
}

export interface OptionBase {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectMenuState {
  currentFilter: string
}
