import styled, {DefaultTheme} from 'styled-components'
import {TabProps, TabListProps, TabsAppearanceType} from './types'

export const TabList = styled.ul<
  TabListProps & {visibleItemsCount?: number; isOpen?: boolean}
>`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: ${_ => (_.isOpen ? 'column' : 'row')};
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 100%;
  ${_ => getTabListStyle(_.appearance, _.isOpen, _.disabled)}
  ${_ => {
    const elemLiStyle = {}
    if (!_.isOpen && _.visibleItemsCount) {
      elemLiStyle[
        `> li:nth-child(n + ${_.visibleItemsCount}):not(:nth-last-child(1))`
      ] = {
        display: 'none'
      }
    }

    if (_.isOpen) {
      elemLiStyle['li:first-child'] = {
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit'
      }
      elemLiStyle['li:last-child'] = {
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit'
      }
    } else {
      elemLiStyle['li:first-child'] = {
        borderTopLeftRadius: 'inherit',
        borderBottomLeftRadius: 'inherit'
      }
      elemLiStyle['li:last-child'] = {
        borderTopRightRadius: 'inherit',
        borderBottomRightRadius: 'inherit'
      }
    }

    return elemLiStyle
  }}
`

export const Tab = styled.li<TabProps>`
  padding: ${_ => _.theme.spacing.sm};
  position: relative;
  cursor: pointer;

  strong {
    color: ${_ => !_.isSelected && _.theme.colors.text.muted};
  }

  svg path {
    fill: currentColor;
  }

  &:hover > * {
    color: ${_ => _.theme.colors.text.selected};
  }
  ${_ => getTabStyle(_.appearance, _.isSelected)}
`

export const MoreButton = styled.button<{isOpen: boolean}>`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 15px;
  position: absolute;
  width: 50px;
  padding: 20px;
  right: 0;
  top: 0;
  svg {
    transform: ${_ => (_.isOpen ? 'rotateX(180deg)' : '')};
  }
  :focus {
    outline: none;
  }
`

export const MoreButtonContainer = styled.li<{isOpen?: boolean}>`
  ${_ => _.isOpen && {border: 'none'}}
  width: 50px;
`

const getTabListStyle = (
  appearance?: TabsAppearanceType,
  isOpen?: boolean,
  disabled?: boolean
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'flat':
      return {}
    case 'outline':
      return {
        border: `1px solid ${
          disabled ? _.theme.colors.border.muted : _.theme.colors.border.default
        }`,
        ...(disabled && {
          li: {
            cursor: disabled ? 'not-allowed' : 'pointer',
            color: _.theme.colors.text.muted
          }
        }),
        color: _.theme.colors.text.default,
        borderRadius: '6px',
        justifyContent: 'space-between',
        'li:not(:last-child)': {
          borderRight: isOpen
            ? 'none'
            : `1px solid ${_.theme.colors.border.default}`,
          borderBottom: isOpen
            ? `1px solid ${_.theme.colors.border.default}`
            : 'none'
        }
      }
    case 'default':
    default:
      return {
        ..._.theme.elevation.dropdown
      }
  }
}

const getTabStyle = (
  appearance?: TabsAppearanceType,
  isSelected?: boolean
) => (_: {theme: DefaultTheme}) => {
  switch (appearance) {
    case 'flat':
      return {}
    case 'outline':
      return {
        whiteSpace: 'nowrap' as 'nowrap',
        flex: 1,
        textAlign: 'center' as 'center',
        background: isSelected ? _.theme.colors.text.selected : 'transparent',
        ':hover': {
          background: _.theme.colors.background.blueTint
        }
      }
    case 'default':
    default:
      return {
        '&::after': {
          content: isSelected ? '""' : '',
          height: '4px',
          display: 'block',
          position: 'absolute' as 'absolute',
          bottom: 0,
          left: _.theme.spacing.xs,
          right: _.theme.spacing.xs,
          borderRadius: '2px 2px 0 0',
          background: _.theme.colors.text.default
        }
      }
  }
}
