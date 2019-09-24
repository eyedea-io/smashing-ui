import * as React from 'react'
import {Popover} from '@smashing/popover'
import styled from 'styled-components/macro'
import {Button} from '@smashing/button'
import * as S from './styles'
import {
  SelectMenuAppearanceType,
  OptionBase,
  SelectMenuProps,
  SelectMenuState,
  SelectMenuChildrenFn
} from './types'
import {Strong} from '@smashing/typography'

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
  getDefaultButton = (appearance: SelectMenuAppearanceType) => {
    if (appearance !== 'card')
      return <Button>{this.getDefaultSelectedLabel()}</Button>
    return (
      <S.SelectButton appearance="minimal">
        {this.getDefaultSelectedLabel()}
      </S.SelectButton>
    )
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
  determineChildren = (appearance: SelectMenuAppearanceType) => {
    const {children, value} = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: value || []
        })
    }
    return this.getDefaultButton(appearance)
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
        minHeight={this.props.height}
        minWidth={this.props.width}
        content={({close}) => {
          return (
            <S.PopoverHost>
              {this.props.hasTitle && (
                <S.PopoverHeader>
                  <Strong color="intense" variant={400}>
                    {this.props.title}
                  </Strong>
                  <S.CloseButton
                    appearance="minimal"
                    height={24}
                    onClick={close}
                  >
                    <svg viewBox="0 0 16 16">
                      <path
                        d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </S.CloseButton>
                </S.PopoverHeader>
              )}
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
                {this.getFilteredOptions().length <= 0 && (
                  <S.TextContainer>
                    <Strong>No items found</Strong>
                  </S.TextContainer>
                )}
              </S.OptionHost>
            </S.PopoverHost>
          )
        }}
        children={this.determineChildren(this.props.appearance)}
      />
    )
  }
}

const SelectMenu = styled(SelectMenuC)``

export {SelectMenu}

declare module 'styled-components' {
  export interface SmashingSelectMenuDefaults
    extends Partial<{
      selectMenu?: {
        appearance?: SelectMenuAppearanceType
      }
    }> {}
}
