import * as React from 'react'
import fuzzaldrin from 'fuzzaldrin-plus'
import Downshift from 'downshift'
import VirtualList from 'react-tiny-virtual-list'
import styled from 'styled-components'
import {AutocompleteItem} from './autocomplete-item'
import {Heading} from '@smashing/typography'
import {Popover} from '@smashing/popover'
import {AutocompleteProps} from './types'
import {useDefaults, constants} from '@smashing/theme'




const {position: Position} = constants
export type Position =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'

const fuzzyFilter = itemToString => {
  if (itemToString) {
    return (items, input) => {
      const wrappedItems = items.map(item => ({
        key: itemToString(item),
        item
      }))

      return fuzzaldrin
        .filter(wrappedItems, input, {key: 'key'})
        .map(({item}) => item)
    }
  }

  return (items, input) => fuzzaldrin.filter(items, input)
}

const autocompleteItemRenderer = props => <AutocompleteItem {...props} />

const S = {
  Box: styled.div`
    width: '100%';
  `,
  ListBox: styled.div<{width: number}>`
    width: ${_ => _.width};
    padding: 8px;
    border-bottom: 'muted';
  `
}

const Autocomplete: React.SFC<AutocompleteProps> = ({
  itemsFilter,
  children,
  ...props
}) => {
  const defaults = useDefaults('autocomplete', props, {
    itemToString: i => (i ? String(i) : ''),
    itemSize: 32,
    isFilterDisabled: false,
    popoverMinWidth: 240,
    popoverMaxHeight: 240,
    renderItem: autocompleteItemRenderer,
    items: ['Apple', 'Cherry', 'Apricot'],
    defaultSelectedItem: 'Apple',
    position: 'bottom' as Position,
    title: 'Fruits'
  })

  const [targetWidth, setTargetWidth] = React.useState(0)
  let targetRef = React.useRef(document.createElement("div"))

  React.useEffect(()=> {
    const nextWidth = targetRef.current.getBoundingClientRect().width // nie dziaa
    console.log(nextWidth)
    setTargetWidth(nextWidth)
  })

  const renderResults = ({
    width,
    inputValue,
    highlightedIndex,
    selectItemAtIndex,
    selectedItem,
    getItemProps
  }) => {
    const {
      itemSize,
      itemToString,
      renderItem,
      items: originalItems,
      popoverMaxHeight,
      isFilterDisabled
    } = defaults

    const filter = itemsFilter || fuzzyFilter(itemToString)
    const items =
      isFilterDisabled || inputValue.trim() === ''
        ? originalItems
        : filter(originalItems, inputValue)

    if (items.length === 0) return null
    return (
      <S.ListBox width={width}>
        {defaults.title && <Heading variant={100}>{defaults.title}</Heading>}
        {items.length > 0 && (
          <VirtualList
            width="100%"
            height={Math.min(items.length * itemSize, popoverMaxHeight)}
            itemSize={itemSize}
            itemCount={items.length}
            scrollToIndex={highlightedIndex || 0}
            overscanCount={3}
            scrollToAlignment={'auto' as any}
            renderItem={({index, style}) => {
              const item = items[index]
              const itemString = itemToString(item)
              return renderItem(
                getItemProps({
                  item,
                  key: itemString,
                  index,
                  style,
                  children: itemString,
                  onMouseUp: () => {
                    selectItemAtIndex(index)
                  },
                  isSelected: itemToString(selectedItem) === itemString,
                  isHighlighted: highlightedIndex === index
                })
              )
            }}
          />
        )}
      </S.ListBox>
    )
  }
  return (
    <Downshift defaultSelectedItem={defaults.defaultSelectedItem} {...props}>
      {({
        isOpen: isShown,
        inputValue,
        getItemProps,
        selectedItem,
        highlightedIndex,
        selectItemAtIndex,
        getRootProps,
        ...restDownshiftProps
      }) => (
        <S.Box width="100%" {...getRootProps({refKey: 'innerRef'})}>

          <Popover
            bringFocusInside={false}
            isShown={isShown}
            minWidth={defaults.popoverMinWidth}
            position={
              defaults.position ||
              (targetWidth < defaults.popoverMinWidth
                ? Position.BOTTOM_LEFT
                : Position.BOTTOM)
            }
            content={() => {
              return renderResults({
                width: Math.max(targetWidth, defaults.popoverMinWidth),
                inputValue,
                getItemProps,
                selectedItem,
                highlightedIndex,
                selectItemAtIndex
              })
            }}
            minHeight={0}
            animationDuration={0}
          >
            {({isShown: isShownPopover, toggle, getRef}) =>
              children({
                isShown: isShownPopover,
                toggle,
                getRef: ref => {
                  // Use the ref internally to determine the width
                  targetRef = ref
                  getRef(ref)
                },
                inputValue,
                selectedItem,
                highlightedIndex,
                selectItemAtIndex,
                ...restDownshiftProps
              })
            }
          </Popover>
        </S.Box>
      )}
    </Downshift>
  )
}

export {Autocomplete, AutocompleteProps}

declare module 'styled-components' {
  export interface SmashingAutocompleteDefaults
    extends Partial<{
      autocomplete?: {
        itemToString?: () => string
        itemSize?: number
        isFilterDisabled?: boolean
        popoverMinWidth?: number
        popoverMaxHeight?: number
        renderItem?: () => void
        title?: string
      }
    }> {}
}
