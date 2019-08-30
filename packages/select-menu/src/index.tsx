import * as React from 'react'
import {Popover} from '@smashing/popover'
import styled from 'styled-components/macro'
import {Button} from '@smashing/button'
import {Checkbox} from '@smashing/checkbox'
import * as S from './styles'

export type SelectMenuChildrenFn<T extends OptionBase> = <T>(props: {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
  selectedItems: T | T[]
}) => React.ReactNode

interface SelectMenuProps<T extends OptionBase> {
  options: T[]
  selected: T | T[]
  children: React.ReactNode | SelectMenuChildrenFn<T>
  onSelect: (option: T) => void
  onDeselect: (option: T) => void
  multiOptionSelectedItemsLabel?: (itemsSelectedLength: number) => string
  isMultiSelect: boolean
  compareBy: string
  placeholder: string
  renderItem: (
    option: T,
    click: Function,
    selected: boolean,
    options: T[]
  ) => React.ReactNode
}

interface OptionBase {
  label: string
  value: string
  disabled?: boolean
}

interface SelectMenuState {
  currentFilter: string
}

const SelectMenuItem: React.FC<{
  option: OptionBase & any
  isSelected: boolean
  onClick: (option: any) => void
}> = ({option, isSelected, onClick}) => {
  return (
    <Checkbox
      disabled={option.disabled}
      appearance="minimal"
      checked={isSelected}
      onChange={() => onClick(option)}
    >
      <S.OptionDiv>{option.label}</S.OptionDiv>
    </Checkbox>
  )
}

class SelectMenuC<T extends OptionBase> extends React.Component<
  SelectMenuProps<T>,
  SelectMenuState
> {
  constructor(props) {
    super(props)
    this.state = {
      currentFilter: ''
    }
  }
  getDefaultButton = () => {
    return <Button>{this.getDefaultSelectedLabel()}</Button>
  }
  getFilteredOptions = () => {
    if (!this.state.currentFilter.trim()) {
      return this.props.options
    }

    return this.props.options.filter(
      o =>
        `${o.label} ${o.value}`
          .toLowerCase()
          .indexOf(this.state.currentFilter.trim().toLowerCase()) > -1
    )
  }
  getDefaultSelectedLabel = () => {
    const {
      multiOptionSelectedItemsLabel,
      selected,
      placeholder,
      isMultiSelect
    } = this.props
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      return placeholder || isMultiSelect ? 'Select multiple...' : 'Select...'
    }
    if (!isMultiSelect) {
      return (selected as T).label
    }
    if (Array.isArray(selected) && selected.length === 1) {
      return selected[0].label
    }

    const optionsSelectedLength = (selected as T[]).length
    if (multiOptionSelectedItemsLabel) {
      return multiOptionSelectedItemsLabel(optionsSelectedLength)
    }
    return `${optionsSelectedLength} selected`
  }
  determineChildren = () => {
    const {children, selected} = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: selected || []
        })
    }
    return this.getDefaultButton()
  }
  getValue = (option: T) => {
    return option.value
  }
  getLabel = (option: T) => {
    return option.label
  }
  getCompareBy = () => {
    return this.props.compareBy || 'value'
  }
  optionClicked = (option: T) => {
    if (this.isOptionSelected(option) && this.props.isMultiSelect) {
      this.props.onDeselect(option)
    } else {
      this.props.onSelect(option)
    }
  }
  isOptionSelected = (option: T) => {
    if (!this.props.isMultiSelect) {
      return (this.props.selected as T) === option
    }
    return Boolean(
      (this.props.selected as T[]).find(
        s => s[this.getCompareBy()] === option[this.getCompareBy()]
      )
    )
  }
  renderCustomItem = (option: T) => {
    return this.props.renderItem(
      option,
      () => this.optionClicked(option),
      this.isOptionSelected(option),
      this.props.options
    )
  }
  changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentFilter: e.target.value
    })
  }
  render() {
    return (
      <Popover
        content={({close}) => {
          return (
            <S.PopoverHost>
              <S.FilterHost>
                <S.FilterInput
                  value={this.state.currentFilter}
                  onChange={this.changeFilter}
                />
              </S.FilterHost>
              <S.OptionHost>
                {this.getFilteredOptions().map(option => {
                  if (this.props.renderItem) {
                    return this.renderCustomItem(option)
                  }
                  return (
                    <SelectMenuItem
                      key={option.value}
                      option={option}
                      isSelected={this.isOptionSelected(option)}
                      onClick={this.optionClicked}
                    />
                  )
                })}
              </S.OptionHost>
              <S.PopoverFooter>
                <Button onClick={close}>X</Button>
              </S.PopoverFooter>
            </S.PopoverHost>
          )
        }}
        children={this.determineChildren()}
      />
    )
  }
}

// const SelectMenuFC: React.FC<SelectMenuProps<{}>> = ({children, ...props}) => {
//   const renderChildren = () => {
//     return children || <Button>noweee</Button>
//   }

//   return (
//     <Popover
//       content={({close}) => {
//         return (
//           <div>
//             hello<button onClick={close}>asdf</button>
//           </div>
//         )
//       }}
//       children={renderChildren()}
//     />
//   )
// }

const SelectMenu = styled(SelectMenuC)``

export {SelectMenu}

//declare module 'styled-components' {
// export interface SmashingSelectDefaults
//   extends Partial<{
//     select?: {
//       height?: number
//       appearance?: ButtonAppearanceType
//       intent?: ButtonIntentType
//     }
//   }> {}
//}
