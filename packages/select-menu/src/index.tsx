import * as React from 'react'
import {PopoverProps} from '@smashing/popover'
import styled from 'styled-components'
import {Strong} from '@smashing/typography'
import {Menu} from '@smashing/menu'
import {safeInvoke} from '@smashing/theme'
import * as S from './styles'
import {
  SelectMenuAppearanceType,
  OptionBase,
  SelectMenuProps,
  SelectMenuState,
  SelectMenuChildrenFn
} from './types'

// TODO: Refactor to React.FC
class SelectMenuC<T extends OptionBase> extends React.Component<
  SelectMenuProps<T>,
  SelectMenuState
> {
  state = {
    currentFilter: ''
  }
  menuList = React.createRef<HTMLDivElement>()

  scrollToSelectedItem() {
    if (this.menuList.current) {
      const selectedOption = this.menuList.current.querySelector<
        HTMLDivElement
      >('[aria-checked="true"]')

      if (selectedOption !== null) {
        this.menuList.current.scrollTo(0, selectedOption.offsetTop)
      }
    }
  }

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
      return placeholder || (isMultiSelect ? 'Select multiple...' : 'Select...')
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
    const {
      children,
      value,
      appearance,
      height,
      className,
      width,
      invalid
    } = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: value || []
        })
    }
    return (
      <S.Button
        className={className}
        appearance={appearance}
        width={width}
        invalid={invalid}
        disabled={this.props.disabled}
        popoverAppearance={this.props.popoverAppearance}
        {...(height ? {height} : {})}
      >
        {this.getDefaultSelectedLabel()}
      </S.Button>
    )
  }

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

    const popoverPropsForAppearance = {
      accordion: {
        appearance: 'accordion',
        matchTargetWidth: true,
        transitionType: 'expand',
        targetOffset: -1
      } as Partial<PopoverProps>,
      card: {}
    }[this.props.popoverAppearance || 'accordion']

    return (
      <S.Popover
        {...popoverPropsForAppearance}
        invalid={this.props.invalid}
        minWidth={150}
        buttonAppearance={this.props.appearance}
        onOpenStarted={() => this.scrollToSelectedItem()}
        content={({close}) => {
          return (
            <React.Fragment>
              {this.props.hasTitle && (
                <S.PopoverHeader>
                  <S.Title variant={300}>{this.props.title}</S.Title>
                  {this.props.hasCloseButton && (
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
                  )}
                </S.PopoverHeader>
              )}
              {this.props.hasFilter && (
                <S.FilterInput
                  appearance="underline"
                  value={this.state.currentFilter}
                  onChange={this.changeFilter}
                  placeholder="Filter..."
                />
              )}
              <S.MenuContainer ref={this.menuList}>
                {this.getFilteredOptions().length > 0 ? (
                  <Menu>
                    <Menu.OptionsGroup
                      options={this.getFilteredOptions()}
                      value={this.props.value}
                      itemHeight={this.props.height}
                      itemIsSelectable={this.props.isSelectable}
                      separated={this.props.popoverAppearance === 'accordion'} // TODO: Appearance should be taken from defaults
                      invalid={this.props.invalid}
                      onChange={value => {
                        safeInvoke(this.props.onChange, value)
                      }}
                      onSelect={option => {
                        safeInvoke(this.props.onSelect, option.value)
                        if (!this.props.isSelectable) {
                          close()
                        }
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
              </S.MenuContainer>
            </React.Fragment>
          )
        }}
        children={this.determineChildren()}
        position="bottom-left"
        {...popoverProps}
      />
    )
  }
}

;(SelectMenuC as any).defaultProps = {
  popoverAppearance: 'card',
  hasCloseButton: true,
  isSelectable: true
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
