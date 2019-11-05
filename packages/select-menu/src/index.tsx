import * as React from 'react'
import {PopoverProps} from '@smashing/popover'
import styled from 'styled-components'
import {Button} from '@smashing/button'
import {Strong} from '@smashing/typography'
import {Menu} from '@smashing/menu'
import * as S from './styles'
import {
  SelectMenuAppearanceType,
  OptionBase,
  SelectMenuProps,
  SelectMenuState,
  SelectMenuChildrenFn
} from './types'

class SelectMenuC<T extends OptionBase> extends React.Component<
  SelectMenuProps<T>,
  SelectMenuState
> {
  constructor(props: SelectMenuProps<T>) {
    super(props)
    this.state = {
      currentFilter: ''
    }
    this.menuListRef = React.createRef<HTMLDivElement>()
  }

  menuListRef: React.RefObject<HTMLDivElement>
  selectedOptionRef: HTMLDivElement | null = null

  scrollToSelectedItem() {
    if (this.menuListRef.current) {
      const selectedOption = this.menuListRef.current.querySelector<
        HTMLDivElement
      >('[aria-checked="true"]')

      if (selectedOption !== null) {
        this.menuListRef.current.scrollTo(0, selectedOption.offsetTop)
      }
    }
  }

  // FIXME: Remove
  // getOutlineButton = (props: {
  //   toggle: () => void
  //   getRef: (ref: any) => void
  //   isShown: boolean
  // }) => (
  //   <S.InputAsSelectButtonComponent
  //     readOnly
  //     inputInvalid={this.props.invalid}
  //     onClick={props.toggle}
  //     innerRef={props.getRef}
  //     // appearance="outline"
  //     value={this.getDefaultSelectedLabel()}
  //     aria-expanded={props.isShown}
  //     aria-haspopup={true}
  //   />
  // )

  getFilteredOptions = () => {
    const options =
      this.props.hideSelectedItem && this.props.value
        ? this.props.options.filter(o => o.value !== this.props.value)
        : this.props.options

    if (!this.state.currentFilter.trim()) {
      return options
    }

    return options.filter(
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
    const {children, value, appearance, height, className} = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: value || []
        })
    }
    return (
      <Button
        className={className}
        appearance={appearance}
        {...(height ? {height} : {})}
      >
        {this.getDefaultSelectedLabel()}
      </Button>
    )
  }
  // FIXME: Remove if unused
  // getValue = (option: T) => {
  //   return option.value
  // }
  // FIXME: Remove if unused
  // getLabel = (option: T) => {
  //   return option.label
  // }
  // FIXME: Remove if unused
  // getCompareBy = () => {
  //   return this.props.compareBy || 'value'
  // }
  // FIXME: Remove if unused
  // optionClicked = (option: T) => {
  //   if (this.isOptionSelected(option.value) && this.props.isMultiSelect) {
  //     this.props.onDeselect(option.value)
  //   } else {
  //     this.props.onSelect(option.value)
  //   }
  // }
  // FIXME: Remove if unused
  // isOptionSelected = (option: string) => {
  //   if (!this.props.isMultiSelect) {
  //     return this.props.value === option
  //   }
  //   return (this.props.value as string[]).indexOf(option) > -1
  // }
  // FIXME: Remove if unused
  // renderCustomItem = (option: T) => {
  //   if (this.props.renderItem) {
  //     return this.props.renderItem(
  //       option,
  //       () => this.optionClicked(option),
  //       this.isOptionSelected(option.value),
  //       this.props.options
  //     )
  //   }
  //   return <Strong> No items to display</Strong>
  // }
  changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentFilter: e.target.value
    })
  }
  render() {
    // extract allowed props than can be passed to the popover component
    const {
      content,
      onOpenStarted,
      minWidth,
      children,
      isShown,
      ...popoverProps
    }: Partial<PopoverProps> = this.props.popoverProps || {}

    return (
      <S.Popover
        invalid={this.props.invalid}
        // FIXME: Handel appearance
        // appearance={this.props.appearance}
        // FIXME: Handle appearance
        // matchTargetWidth={this.props.appearance === 'outline'}
        onOpenStarted={() => this.scrollToSelectedItem()}
        // FIXME: Handle appearance
        // targetOffset={this.props.appearance === 'outline' ? 0 : undefined}
        // FIXME: Handle appearance
        // transitionType={
        //   this.props.appearance === 'outline' ? 'expand' : 'scale'
        // }
        content={({close}) => {
          return (
            <React.Fragment>
              {this.props.hasTitle && (
                <S.PopoverHeader>
                  <S.Title variant={300}>{this.props.title}</S.Title>
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
              <S.OptionHost
                ref={this.menuListRef}
                // FIXME: Handle appearance
                // appearance={this.props.appearance}
                // TODO: Handle popover height
                // height={this.props.height}
              >
                {this.getFilteredOptions().length > 0 ? (
                  <Menu>
                    <Menu.OptionsGroup
                      options={this.getFilteredOptions()}
                      value={this.props.value}
                      onSelect={option => {
                        safeInvoke(this.props.onSelect, option.value)
                      }}
                      onDeselect={option => {
                        safeInvoke(this.props.onDeselect, option.value)
                      }}
                    />
                  </Menu>
                ) : (
                  <S.EmptyView>
                    <Strong variant={300}>No items found</Strong>
                  </S.EmptyView>
                )}
              </S.OptionHost>
            </React.Fragment>
          )
        }}
        children={this.determineChildren()}
        {...popoverProps}
      />
    )
  }
}

const SelectMenu = styled(SelectMenuC)``

export {SelectMenu}

function safeInvoke(fn, ...args) {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}

declare module 'styled-components' {
  export interface SmashingSelectMenuDefaults
    extends Partial<{
      selectMenu?: {
        appearance?: SelectMenuAppearanceType
      }
    }> {}
}
