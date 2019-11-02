import * as React from 'react'
import {PopoverProps} from '@smashing/popover'
import styled from 'styled-components'
import {Button} from '@smashing/button'
import {Strong} from '@smashing/typography'
import * as S from './styles'
import {
  SelectMenuAppearanceType,
  OptionBase,
  SelectMenuProps,
  SelectMenuState,
  SelectMenuChildrenFn
} from './types'

const SelectMenuItem: React.FC<{
  option: OptionBase
  isSelected: boolean
  appearance?: SelectMenuAppearanceType
  onClick: (option: any) => void
  innerRef?: any
}> = ({option, isSelected, appearance, innerRef, onClick}) => {
  return (
    <S.Checkbox
      innerRef={innerRef}
      disabled={option.disabled}
      appearance={appearance}
      checked={isSelected}
      onChange={() => onClick(option)}
    >
      <S.OptionDiv appearance={appearance} onChange={() => onClick(option)}>
        {appearance === 'outline' ? (
          <Strong color={option.disabled ? 'muted' : 'intense'}>
            {option.label}
          </Strong>
        ) : (
          option.label
        )}
      </S.OptionDiv>
    </S.Checkbox>
  )
}

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
  inputRef: HTMLDivElement | null = null
  selectedOptionRef: HTMLDivElement | null = null

  componentDidMount() {
    this.setState({
      width: (this.inputRef && this.inputRef.clientWidth) || undefined
    })
  }

  scrollToSelectedItem() {
    if (this.menuListRef.current && this.selectedOptionRef) {
      this.menuListRef.current.scrollTo(0, this.selectedOptionRef.offsetTop)
    }
  }
  getSelectButton = (appearance?: SelectMenuAppearanceType) => {
    if (appearance === 'card') {
      return (
        <S.SelectButton appearance="minimal">
          {this.getDefaultSelectedLabel()}
        </S.SelectButton>
      )
    }
    if (appearance === 'outline') {
      return this.getOutlineButton
    }
    return <Button>{this.getDefaultSelectedLabel()}</Button>
  }

  getOutlineButton = (props: {
    toggle: () => void
    getRef: (ref: any) => void
    isShown: boolean
  }) => (
    <S.InputAsSelectButtonComponent
      readOnly
      onClick={props.toggle}
      innerRef={ref => {
        // Ref for internal use, i.e. calculating menu width
        this.inputRef = ref

        // Ref that is being passed to the popover mechanism
        props.getRef(ref)
      }}
      appearance="outline"
      value={this.getDefaultSelectedLabel()}
      height={48}
      aria-expanded={props.isShown}
      aria-haspopup={true}
    />
  )

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
  determineChildren = (appearance?: SelectMenuAppearanceType) => {
    const {children, value} = this.props
    if (typeof children === 'function') {
      return popoverChildrenProps =>
        (children as SelectMenuChildrenFn<T>)({
          ...popoverChildrenProps,
          selectedItems: value || []
        })
    }
    return this.getSelectButton(appearance)
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
    if (this.props.renderItem) {
      return this.props.renderItem(
        option,
        () => this.optionClicked(option),
        this.isOptionSelected(option.value),
        this.props.options
      )
    }
    return <Strong> No items to display</Strong>
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

    return (
      <S.Popover
        appearance={this.props.appearance}
        matchTargetWidth
        onOpenStarted={() => this.scrollToSelectedItem()}
        targetOffset={this.props.appearance === 'outline' ? 0 : undefined}
        transitionType={
          this.props.appearance === 'outline' ? 'expand' : 'scale'
        }
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
              <S.OptionHost
                ref={this.menuListRef}
                appearance={this.props.appearance}
                height={this.props.height}
              >
                {this.getFilteredOptions().map(option => {
                  if (this.props.renderItem) {
                    return this.renderCustomItem(option)
                  }
                  return (
                    <SelectMenuItem
                      appearance={this.props.appearance}
                      key={option.value}
                      innerRef={ref => {
                        if (this.isOptionSelected(option.value)) {
                          this.selectedOptionRef = ref
                        }
                      }}
                      option={option}
                      isSelected={this.isOptionSelected(option.value)}
                      onClick={e => {
                        this.optionClicked(e)
                        if (!this.props.isMultiSelect) close()
                      }}
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
        {...popoverProps}
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
