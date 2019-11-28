import * as React from 'react'
import {PopoverProps} from '@smashing/popover'
import styled from 'styled-components'
import {Strong} from '@smashing/typography'
import {Menu} from '@smashing/menu'
import {safeInvoke, useDefaults} from '@smashing/theme'
import * as S from './styles'
import {
  SelectMenuAppearanceType,
  OptionBase,
  SelectMenuProps,
  SelectMenuChildrenFn,
  SelectMenuPopoverAppearanceType
} from './types'

const SelectMenuFC = <T extends OptionBase>(props: SelectMenuProps<T>) => {
  const defaults = useDefaults('selectMenu', props, {
    height: 32,
    hasCloseButton: true,
    isSelectable: true,
    popoverAppearance: 'card' as SelectMenuPopoverAppearanceType,
    appearance: 'default' as SelectMenuAppearanceType,
    placeholder: undefined as SelectMenuProps<T>['placeholder'],
    placeholderForMultipleSelected: selected => `${selected.length} items`
  })
  // extract allowed props than can be passed to the popover component
  const {
    content,
    onOpenStarted,
    minWidth,
    children,
    isShown,
    ...popoverProps
  }: Partial<PopoverProps> = props.popoverProps || {}
  const [currentFilter, setCurrentFilter] = React.useState<string>('')
  const menuList = React.useRef<HTMLDivElement>(null)
  const popoverPropsForAppearance = React.useMemo(
    () =>
      ({
        accordion: {
          appearance: 'accordion',
          matchTargetWidth: true,
          transitionType: 'expand',
          targetOffset: -1
        } as Partial<PopoverProps>,
        card: {}
      }[defaults.popoverAppearance || 'accordion']),
    [defaults.popoverAppearance]
  )
  const getFilteredOptions = () => {
    const options =
      props.hideSelectedItem && props.value
        ? props.options.filter(o => o.value !== props.value)
        : props.options

    if (!currentFilter.trim()) {
      return options
    }

    return options.filter(
      o =>
        `${o.label} ${o.value}`
          .toLowerCase()
          .indexOf(currentFilter.trim().toLowerCase()) > -1
    )
  }
  const scrollToSelectedItem = React.useCallback(() => {
    if (menuList.current) {
      const selectedOption = menuList.current.querySelector<HTMLDivElement>(
        '[aria-checked="true"]'
      )

      if (selectedOption !== null) {
        menuList.current.scrollTo(0, selectedOption.offsetTop)
      }
    }
  }, [menuList.current])

  const placeholder = React.useMemo(() => {
    const valueIsArray = Array.isArray(props.value)
    const selected = props.options.filter(item =>
      valueIsArray
        ? props.value.includes(item.value)
        : props.value === item.value
    )
    const hasOneSelectedValue = selected.length === 1

    if (
      typeof defaults.placeholder === 'function' &&
      defaults.placeholder !== undefined
    ) {
      return defaults.placeholder(selected)
    }

    if (selected.length === 0) {
      return defaults.placeholder || 'Select...'
    }

    if (!valueIsArray || hasOneSelectedValue) {
      return selected[0].label
    }

    return defaults.placeholderForMultipleSelected(selected)
  }, [props.value])

  return (
    <S.Popover
      {...popoverPropsForAppearance}
      invalid={props.invalid}
      minWidth={150}
      buttonAppearance={defaults.appearance}
      onOpenStarted={scrollToSelectedItem}
      content={({close}) => {
        return (
          <React.Fragment>
            {props.hasTitle && (
              <S.PopoverHeader>
                <S.Title variant={300}>{props.title}</S.Title>
                {defaults.hasCloseButton && (
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
            {props.hasFilter && (
              <S.FilterInput
                appearance="underline"
                value={currentFilter}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentFilter(event.target.value)
                }
                placeholder="Filter..."
              />
            )}
            <S.MenuContainer ref={menuList}>
              {getFilteredOptions().length > 0 ? (
                <Menu>
                  <Menu.OptionsGroup
                    options={getFilteredOptions()}
                    value={props.value}
                    itemHeight={defaults.height}
                    itemIsSelectable={defaults.isSelectable}
                    separated={defaults.popoverAppearance === 'accordion'} // TODO: Appearance should be taken from defaults
                    invalid={props.invalid}
                    onChange={value => {
                      safeInvoke(props.onChange, value)
                    }}
                    onSelect={option => {
                      safeInvoke(props.onSelect, option.value)
                      if (!defaults.isSelectable) {
                        close()
                      }
                    }}
                    onDeselect={option => {
                      safeInvoke(props.onDeselect, option.value)
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
      position="bottom-left"
      {...popoverProps}
    >
      {typeof props.children === 'function' ? (
        popoverChildrenProps =>
          (children as SelectMenuChildrenFn<T>)({
            ...popoverChildrenProps,
            selectedItems: props.value || []
          })
      ) : (
        <S.Button
          className={props.className}
          width={props.width}
          invalid={props.invalid}
          disabled={props.disabled}
          appearance={defaults.appearance}
          popoverAppearance={defaults.popoverAppearance}
          {...(defaults.height ? {height: defaults.height} : {})}
        >
          {placeholder}
        </S.Button>
      )}
    </S.Popover>
  )
}

export const SelectMenu = styled(SelectMenuFC)``

declare module 'styled-components' {
  export interface SmashingSelectMenuDefaults
    extends Partial<{
      selectMenu?: Pick<
        SelectMenuProps<any>,
        | 'height'
        | 'appearance'
        | 'popoverAppearance'
        | 'hasCloseButton'
        | 'placeholder'
        | 'placeholderForMultipleSelected'
      >
    }> {}
}
