import * as React from 'react'
import {Popover} from '@smashing/popover'
import styled from 'styled-components/macro'
import {Button} from '@smashing/button'
import {Checkbox} from '@smashing/checkbox'
import * as S from './styles'
import {SelectMenuAppearanceType} from './types'

export type SelectMenuChildrenFn<T extends OptionBase> = <T>(props: {
  toggle: () => void
  getRef: (ref: any) => void
  isShown: boolean
  selectedItems: T | T[]
}) => React.ReactNode

interface SelectMenuProps<T extends OptionBase> {
  options: T[]
  value: string | string[]
  children: React.ReactNode | SelectMenuChildrenFn<T>
  appearance: SelectMenuAppearanceType
  hasFilter: boolean
  hasCloseButton: boolean
  onSelect: (value: string) => void
  onDeselect: (value: string) => void
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
  appearance: SelectMenuAppearanceType
  onClick: (option: any) => void
}> = ({option, isSelected, appearance, onClick}) => {
  return (
    <S.Checkbox
      disabled={option.disabled}
      appearance={appearance}
      checked={isSelected}
      onChange={() => onClick(option)}
    >
      <S.OptionDiv appearance={appearance} onChange={() => onClick(option)}>
        {option.label}
      </S.OptionDiv>
    </S.Checkbox>
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
      value,
      placeholder,
      isMultiSelect
    } = this.props
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder || isMultiSelect ? 'Select multiple...' : 'Select...'
    }
    if (!isMultiSelect) {
      return value
    }
    if (Array.isArray(value) && value.length === 1) {
      return value[0]
    }

    const optionsSelectedLength = (value as string[]).length
    if (multiOptionSelectedItemsLabel) {
      return multiOptionSelectedItemsLabel(optionsSelectedLength)
    }
    return `${optionsSelectedLength} selected`
  }
  determineChildren = () => {
    const {children, value} = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: value || []
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
    if (this.isOptionSelected(option.value) && this.props.isMultiSelect) {
      this.props.onDeselect(option.value)
    } else {
      this.props.onSelect(option.value)
    }
  }
  isOptionSelected = (option: string) => {
    if (!this.props.isMultiSelect) {
      return this.props.value === option
    }
    return (this.props.value as string[]).indexOf(option) > -1
  }
  renderCustomItem = (option: T) => {
    return this.props.renderItem(
      option,
      () => this.optionClicked(option),
      this.isOptionSelected(option.value),
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
              {this.props.hasFilter && (
                <S.FilterHost>
                  <S.FilterInput
                    appearance="underline"
                    value={this.state.currentFilter}
                    onChange={this.changeFilter}
                    placeholder="Filter..."
                  />
                </S.FilterHost>
              )}
              <S.OptionHost appearance={this.props.appearance}>
                {this.getFilteredOptions().map(option => {
                  if (this.props.renderItem) {
                    return this.renderCustomItem(option)
                  }
                  return (
                    <SelectMenuItem
                      appearance={this.props.appearance}
                      key={option.value}
                      option={option}
                      isSelected={this.isOptionSelected(option.value)}
                      onClick={this.optionClicked}
                    />
                  )
                })}
              </S.OptionHost>
              {this.props.hasCloseButton && (
                <S.PopoverFooter>
                  <Button onClick={close}>X</Button>
                </S.PopoverFooter>
              )}
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
