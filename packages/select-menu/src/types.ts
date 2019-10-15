export type SelectMenuAppearanceType = 'primary' | 'minimal' | 'card'

export type SelectMenuChildrenFn<T extends OptionBase> = <T>(props: {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
  selectedItems: T | T[]
}) => React.ReactNode

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
}

export interface OptionBase {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectMenuState {
  currentFilter: string
}
