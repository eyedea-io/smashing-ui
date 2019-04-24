import * as React from "react"
import styled from "styled-components"
import {Text, Heading} from "@smashing/typography"

const KeyCodes = {
  ArrowUp: 38,
  ArrowDown: 40,
  Home: 36,
  End: 35
}

export const Menu = ({children}) => {
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (menuRef.current === null) return

    // Get the menu item buttons
    const menuItems = Array.from(
      menuRef.current.querySelectorAll<HTMLDivElement>(
        '[role="menuitemradio"], [role="menuitem"]'
      )
    )

    if (menuItems.length === 0) {
      throw new Error("The menu has no menu items")
    }

    const firstItem = menuItems[0]
    const lastItem = menuItems[menuItems.length - 1]

    const focusNext = (
      currentItem: HTMLDivElement,
      startItem: HTMLDivElement
    ) => {
      // Determine which item is the startItem (first or last)
      const goingDown = startItem === firstItem

      // Helper function for getting next legitimate element
      const move = (
        item: HTMLDivElement
      ): HTMLDivElement & {
        disabled?: boolean
      } => {
        const indexOfItem = menuItems.indexOf(item)

        if (goingDown) {
          if (indexOfItem < menuItems.length - 1) {
            return menuItems[indexOfItem + 1]
          }

          return startItem
        }

        if (indexOfItem - 1 > -1) {
          return menuItems[indexOfItem - 1]
        }

        return startItem
      }

      // Make first move
      let nextItem = move(currentItem)

      // If the menuitem is disabled move on
      while (nextItem.disabled) {
        nextItem = move(nextItem)
      }

      // Focus the first one that's not disabled
      nextItem.focus()
    }

    menuItems.forEach(menuItem => {
      // Handle key presses for menuItem
      menuItem.addEventListener("keydown", e => {
        // Go to next/previous item if it exists
        // or loop around

        if (e.keyCode === KeyCodes.ArrowDown) {
          e.preventDefault()
          focusNext(menuItem, firstItem)
        }

        if (e.keyCode === KeyCodes.ArrowUp) {
          e.preventDefault()
          focusNext(menuItem, lastItem)
        }

        if (e.keyCode === KeyCodes.Home) {
          e.preventDefault()
          firstItem.focus()
        }

        if (e.keyCode === KeyCodes.End) {
          e.preventDefault()
          lastItem.focus()
        }
      })
    })
  }, [])

  return (
    <div ref={menuRef} role="menu">
      {children}
    </div>
  )
}

const S = {
  Item: styled.div`
    height: 32px;
    display: flex;
    align-items: center;

    &[data-isselectable="true"] {
      cursor: pointer;
    }

    &:hover {
      background-color: ${_ => _.theme.scales.neutral.N1A};
    }

    &:focus {
      background-color: ${_ => _.theme.scales.blue.B1A};
      outline: none;
    }

    &:active {
      background-color: ${_ => _.theme.scales.blue.B2A};
    }
  `,
  Text: styled(Text)`
    flex: 1;
    margin-left: ${_ => _.theme.spacing.sm};
    margin-right: ${_ => _.theme.spacing.sm};
  `,
  SecondaryText: styled(Text)`
    margin-right: ${_ => _.theme.spacing.sm};
  `,
  Group: styled.div`
    padding-top: ${_ => _.theme.spacing.xxs};
    padding-bottom: ${_ => _.theme.spacing.xxs};
  `,
  GroupHeading: styled(Heading)`
    margin-top: ${_ => _.theme.spacing.xxs};
    margin-bottom: ${_ => _.theme.spacing.xxs};
    margin-left: ${_ => _.theme.spacing.sm};
    margin-right: ${_ => _.theme.spacing.sm};
  `,
  Divider: styled.div`
    border-bottom: 1px solid ${_ => _.theme.colors.border.default};
  `
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  appearance,
  secondaryText,
  intent,
  ...passthroughProps
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    safeInvoke(passthroughProps.onSelect, event)
    safeInvoke(passthroughProps.onClick, event)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      safeInvoke(passthroughProps.onSelect, event)
      event.preventDefault()
    }
    safeInvoke(passthroughProps.onKeyPress, event)
  }

  if (process.env.NODE_ENV !== "production" && "onClick" in passthroughProps) {
    console.warn(
      "<Menu.Item> expects `onSelect` prop, but you passed `onClick`."
    )
  }

  return (
    <S.Item
      role="menuitem"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      data-isselectable="true"
      {...passthroughProps}
    >
      <S.Text intent={intent}>{children}</S.Text>
      {secondaryText && (
        <S.SecondaryText color="muted">{secondaryText}</S.SecondaryText>
      )}
    </S.Item>
  )
}

MenuItem.defaultProps = {
  intent: "none",
  appearance: "default",
  onSelect: () => {}
}

const MenuGroup: React.FC<MenuGroupProps> = ({title, children}) => {
  return (
    <S.Group>
      {title && <S.GroupHeading variant={100}>{title}</S.GroupHeading>}
      {children}
    </S.Group>
  )
}

Menu.Group = MenuGroup
Menu.Item = MenuItem
Menu.Divider = S.Divider

export interface MenuGroupProps {
  /**
   * Title of the menu group.
   */
  title?: React.ReactNode

  /**
   * The children of the menu group.
   */
  children: React.ReactNode
}

function safeInvoke(fn, ...args) {
  if (typeof fn === "function") {
    return fn(...args)
  }
}

export interface MenuItemProps {
  /**
   * Function that is called on click and enter/space keypress.
   */
  onSelect?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => void

  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void

  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void

  /**
   * The children of the component.
   */
  children: React.ReactChild

  /**
   * Secondary text shown on the right.
   */
  secondaryText?: React.ReactNode

  /**
   * The default theme only supports one default appearance.
   */
  appearance?: "default"

  /**
   * The intent of the menu item.
   */
  intent?: "none" | "success" | "warning" | "danger" | "info"
}
